import { PrismaClient } from "@prisma/client";

export type CreateSoftwarePayload = {
  name: string,
  commonIssueIds: [number],
  departmentIds: [number],
  techIds: [number]
}

export type UpdateSoftwarePayload = {
  id: number,
  name: string,
  commonIssueIds: [number],
  departmentIds: [number],
  techIds: [number]
}

export type AddOrRemoveForeignKeysPayload = {
  id: number,
  commonIssueIds: [number],
  departmentIds: [number],
  techIds: [number]
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


  async createSoftware({name, commonIssueIds, departmentIds, techIds}: CreateSoftwarePayload) {
    return this.db.software.create({
      data: {
        name: name,
        commonIssues: {
          connect: commonIssueIds.map(id => ({id}))
        },
        department: {
          connect: departmentIds.map(id => ({id})),
        },
        support: {
          connect: techIds.map(id => ({id}))
        },
      },
      include: {
        commonIssues: true,
        department: true,
        support: true,
      }
    });
  }

  async updateSoftware({id, name, commonIssueIds, departmentIds, techIds}: UpdateSoftwarePayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        commonIssues: {
          connect: commonIssueIds.map(id => ({id}))
        },
        department: {
          connect: departmentIds.map(id => ({id})),
        },
        support: {
          connect: techIds.map(id => ({id}))
        },
      },
      include: {
        commonIssues: true,
        department: true,
        support: true,
      }
    })
  }

  async addForeignKeys({id, departmentIds, techIds, commonIssueIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        department: {
          connect: departmentIds.map(id => ({id})),
        },
        support: {
          connect: techIds.map(id => ({id}))
        },
        commonIssues: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        commonIssues: true,
        department: true,
        support: true,
      }
    })    
  }

  async removeForeignKeys({id, departmentIds, techIds, commonIssueIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        department: {
          disconnect: departmentIds.map(id => ({id}))
        },
        support: {
          disconnect: techIds.map(id => ({id}))
        },
        commonIssues: {
          disconnect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        commonIssues: true,
        department: true,
        support: true,
      }
    })
  }

  async deleteSoftware(id: number) {
    return this.db.software.delete({
      where: {
        id: id,
      },
      include: {
        commonIssues: true,
        department: true,
        support: true,
      }
    })
  }


  async getSoftwareById(id: number) {
    return this.db.software.findUnique({
      where: {
        id: id
      },
      include: {
        support: true,
        commonIssues: true,
        department: true,
      }
    });
  }
}