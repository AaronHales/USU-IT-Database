import { PrismaClient } from "@prisma/client";

export type CreateCommonIssuePayload = {
  departmentId: number,
}

export type UpdateCommonIssuePayload = {
  id: number,
  departmentId: number,
}

export class CommonIssueRepository {
  private db: PrismaClient
  private static instance: CommonIssueRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): CommonIssueRepository {
    if (!this.instance) {
      this.instance = new CommonIssueRepository(db!!);
    }
    return this.instance;
  }


  async createCommonIssue({departmentId}: CreateCommonIssuePayload) {
    return this.db.commonIssue.create({
      data: {
        departmentId: departmentId,
      }
    });
  }

  async updateCommonIssue({id, departmentId}: UpdateCommonIssuePayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        departmentId: departmentId,
      }
    })
  }

  async deleteCommonIssue(id: number) {
    return this.db.commonIssue.delete({
      where: {
        id: id,
      }
    })
  }


  async getCommonIssueById(id: number) {
    return this.db.commonIssue.findUnique({
      where: {
        id: id
      },
    });
  }
}