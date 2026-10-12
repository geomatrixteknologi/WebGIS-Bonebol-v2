import { Column, Entity } from "typeorm";

@Entity("M_PENGADUAN", { schema: "PBB_KUTAI-BARAT" })
export class MPengaduan {
  @Column("numeric", { name: "PARENT_ID", precision: 1000, scale: 53 })
  parentId!: string;

  @Column("character varying", {
    name: "USERNAME",
    nullable: true,
    length: 100,
  })
  username!: string | null;
}
