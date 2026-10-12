import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";
import { OverdueAnalysisService } from "../services/OverdueAnalysisService";

const fullNopExpression = (alias: string): string => {
  return `${alias}.kdPropinsi || ${alias}.kdDati2 || ${alias}.kdKecamatan || ${alias}.kdKelurahan || ${alias}.kdBlok || ${alias}.noUrut || ${alias}.kdJnsOp`;
};

const spptNop = fullNopExpression("sppt");

export const getOverdueMapData = async (req: Request, res: Response) => {
  try {
    const spptRepository = new SpptRepository();

    const spptColumnsForGroupBy = [
      "sppt.kdPropinsi",
      "sppt.kdDati2",
      "sppt.kdKecamatan",
      "sppt.kdKelurahan",
      "sppt.kdBlok",
      "sppt.noUrut",
      "sppt.kdJnsOp"
    ];

    // 1. Create a subquery for NOT EXISTS condition
    const notExistsSubquery = spptRepository.createQueryBuilder("paid")
      .select("1")
      .where(`${fullNopExpression("paid")} = ${spptNop}`)
      .andWhere("paid.statusPembayaranSppt = '1'")
      .andWhere("paid.thnPajakSppt >= sppt.thnPajakSppt");

    // 2. Fetch NOP and oldest due date directly from DB using NOT EXISTS
    const unpaidRecords = await spptRepository
      .createQueryBuilder("sppt")
      .select([`${spptNop} AS nop`, `MIN(sppt.tglJatuhTempoSppt) AS "oldestDueDate"`])
      .where("COALESCE(sppt.statusPembayaranSppt, '0') <> '1'")
      .andWhere("sppt.tglJatuhTempoSppt IS NOT NULL")
      .andWhere("sppt.tglJatuhTempoSppt < CURRENT_DATE")
      .andWhere(`NOT EXISTS (${notExistsSubquery.getQuery()})`)
      .groupBy(spptColumnsForGroupBy.join(", "))
      .getRawMany();

    // 3. Calculate days overdue for each NOP using service layer
    const today = new Date();
    const result = unpaidRecords.map((item) => ({
      nop: item.NOP,
      daysOverdue: OverdueAnalysisService.calculateDaysOverdue(new Date(item.oldestDueDate), today),
    }));

    return res.status(200).json({
      code: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching overdue map data:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
