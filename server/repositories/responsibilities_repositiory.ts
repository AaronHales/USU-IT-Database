import { PrismaClient } from "@prisma/client";

export type CreateResponsibilityPayload = {
  responsibility: string
  departmentID: number|undefined,
}

export type UpdateResponsibilityPayload = {
  id: number,
  responsibility: string|undefined
  departmentID: number|undefined,
}

export type DeleteResponsibilityPayload = {
  id: number,
}

export class ResponsibilitiesRepository {
  private db: PrismaClient
  private static instance: ResponsibilitiesRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ResponsibilitiesRepository {
    if (!this.instance) {
      this.instance = new ResponsibilitiesRepository(db!!);
    }
    return this.instance;
  }


  async createResponsibility({responsibility, departmentID}: CreateResponsibilityPayload) {
    return this.db.responsibility.create({
      data: {
        responsibility: responsibility,
        departmentId: departmentID,
      }
    });
  }

  async updateResponsibility({id, responsibility, departmentID}: UpdateResponsibilityPayload) {
    return this.db.responsibility.update({
      where: {
        id: id,
      },
      data: {
        responsibility: responsibility,
        departmentId: departmentID
      }
    })
  }

  async deleteResponsibility({id}: DeleteResponsibilityPayload) {
    return this.db.responsibility.delete({
      where: {
        id: id
      }
    })
  }

  async getResponsibilityById(id: number) {
    return this.db.responsibility.findUnique({
      where: {
        id: id
      },
    });
  }
}