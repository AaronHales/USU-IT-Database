import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateExtensionPayload = {
  phoneNumber: string,
  departmentIds: [number],
}

export type UpdateExtensionPayload = {
  id: number,
  phoneNumber: string,
  departmentIds: [number]
}

export type AddOrRemoveForeignKeysPayload = {
  id: number,
  departmentIds: [number],
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


  async createExtension({phoneNumber, departmentIds}: CreateExtensionPayload) {
    return this.db.extension.create({
      data: {
        phoneNumber: phoneNumber,
        department: {
          connect: departmentIds.map(id => ({id}))
        }
      }
    });
  }

  async updateExtension({id, phoneNumber, departmentIds}: UpdateExtensionPayload) {
    return this.db.extension.update({
      where: {
        id: id,
      },
      data: {
        phoneNumber: phoneNumber,
        department: {
          connect: departmentIds.map(id => ({id}))
        }
      }
    })
  }

  async addForeignKeys({id, departmentIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.extension.update({
      where: {
        id: id,
      },
      data: {
        department: {
          connect: departmentIds.map(id => ({id}))
        }
      }
    })
  }

  async removeForeignKeys({id, departmentIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.extension.update({
      where: {
        id: id,
      },
      data: {
        department: {
          disconnect: departmentIds.map(id => ({id}))
        }
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