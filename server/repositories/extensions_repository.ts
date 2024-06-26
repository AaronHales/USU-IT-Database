import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateExtensionPayload = {
  phoneNumber: number,
  departmentId: number|undefined,
}

export type UpdateExtensionPayload = {
  id: number,
  phoneNumber: number,
  departmentId: number|undefined
}

export class ExtensionsRepository {
  private db: PrismaClient
  private static instance: ExtensionsRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ExtensionsRepository {
    if (!this.instance) {
      this.instance = new ExtensionsRepository(db!!);
    }
    return this.instance;
  }


  async createExtension({phoneNumber, departmentId}: CreateExtensionPayload) {
    return this.db.extension.create({
      data: {
        phoneNumber: phoneNumber,
        departmentId: departmentId
      }
    });
  }

  async updateExtension({id, phoneNumber, departmentId}: UpdateExtensionPayload) {
    return this.db.extension.update({
      where: {
        id: id,
      },
      data: {
        phoneNumber: phoneNumber,
        departmentId: departmentId,
      }
    })
  }

  async deleteExtension(id: number) {
    return this.db.extension.delete({
      where: {
        id: id,
      }
    })
  }

  async getExtensionById(id: number) {
    return this.db.extension.findUnique({
      where: {
        id: id
      },
    });
  }
}