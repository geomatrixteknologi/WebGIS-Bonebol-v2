import { UserAccount } from "../entity/entities/UserAccount";
import { AppDataSource } from "../data-resource";
import { BaseRepository, PaginatedResult } from "./BaseRepository";
import { Not } from "typeorm";

// Interface untuk data User itu sendiri
export interface User {
  id: number | string;
  username: string;
  role: string;
}

export class UserRepository extends BaseRepository<UserAccount> {
  constructor() {
    super(AppDataSource.getRepository(UserAccount));
  }

  async getAllUser(page: string, limit: string): Promise<PaginatedResult<User>> {
    return this.findPaginated(
      {
        where: {
          role: Not("admin"),
        },
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
      {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      }
    );
  }

  async getUserById(userid: number, page: string, limit: string): Promise<PaginatedResult<User>> {
    return this.findPaginated(
      {
        where: {
          id: userid,
        },
        select: {
          id: true,
          username: true,
          role: true,
        },
      },
      {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      }
    );
  }

  async deleteByUserId(userId: string | number): Promise<number> {
    const result = await this.repository.createQueryBuilder().delete().where("id = :userId", { userId }).execute();

    const final = result.affected || 0;
    return final;
  }
}
