import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "5" } = req.query;

    const result = await userRepository.getAllUser(page as string, limit as string);

    return res.status(200).json({
      code: 200,
      data: result.data,
      pagination: result.pagination,
      message: "Data user berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data user:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userid } = req.query;
    const { page, limit } = { page: "1", limit: "5" };

    const result = await userRepository.getUserById(parseInt(userid as string), page as string, limit as string);

    return res.status(200).json({
      code: 200,
      data: result.data,
      pagination: result.pagination,
      message: `Data user ${userid} berhasil diambil`,
    });
  } catch (error) {
    console.error("Error mengambil data user:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userid } = req.query;

    if (!userid) {
      return res.status(400).json({
        code: 400,
        message: "User ID wajib dikirim",
      });
    }

    const user = await userRepository.findOne({
      where: { id: parseInt(userid as string) },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User tidak ditemukan",
      });
    }

    await userRepository.deleteByUserId(userid as string);

    return res.status(200).json({
      code: 200,
      message: `User ${user.username} berhasil dihapus`,
    });
  } catch (error) {
    console.error("Error menghapus data user:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
