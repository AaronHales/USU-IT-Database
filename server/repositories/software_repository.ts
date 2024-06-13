import { PrismaClient } from "@prisma/client";

export type CreateSoftwarePayload = {
  name: string,
  departmentId: number,
}

export type UpdateSoftwarePayload = {
  id: number,
  name: string,
  departmentId: number,
}

export class SoftwareRepository {
  private db: PrismaClient
  private static instance: SoftwareRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): SoftwareRepository {
    if (!this.instance) {
      this.instance = new SoftwareRepository(db!!);
    }
    return this.instance;
  }


  async createSoftware({name, departmentId}: CreateSoftwarePayload) {
    return this.db.software.create({
      data: {
        name: name,
        departmentId: departmentId,
      }
    });
  }

  async updateSoftware({id, name, departmentId}: UpdateSoftwarePayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        departmentId: departmentId,
      }
    })
  }

  async deleteSoftware(id: number) {
    return this.db.software.delete({
      where: {
        id: id,
      }
    })
  }


  async getSoftwareById(id: number) {
    return this.db.software.findUnique({
      where: {
        id: id
      },
    });
  }
}