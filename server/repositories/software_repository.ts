import { PrismaClient } from "@prisma/client";

export type CreateSoftwarePayload = {
  name: string,
}

export type UpdateSoftwarePayload = {
  id: number,
  name: string,
}

export type AddOrRemoveDepartmentPayload = {
  id: number,
  departmentId: number,
}

export type AddOrRemoveSupportPayload = {
  id: number,
  techId: number,
}

export type AddCommonIssuePayload = {
  id: number,
  commonIssueId: number|undefined,
  problem: string|undefined,
  solution: string|undefined,
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


  async createSoftware({name}: CreateSoftwarePayload) {
    return this.db.software.create({
      data: {
        name: name,
      }
    });
  }

  async updateSoftware({id, name}: UpdateSoftwarePayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })
  }

  async addCommonIssue({id, commonIssueId, problem, solution}: AddCommonIssuePayload) {
    return this.db.commonIssue.upsert({
      where: {
        id: commonIssueId
      },
      update: {
        softwareId: id,
      },
      create: {
        problem: problem,
        solution: solution,
        softwareId: id
      },
    })
  }

  async addDepartment({id, departmentId}: AddOrRemoveDepartmentPayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        department: {
          connect: [{id: departmentId}],
        }
      }
    })    
  }

  async removeDepartment({id, departmentId}: AddOrRemoveDepartmentPayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        department: {
          disconnect: [{id: departmentId}],
        }
      }
    })
  }

  async addSupport({id, techId} : AddOrRemoveSupportPayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        support: {
          connect: [{id: techId}],
        }
      }
    })    
  }

  async removeSupport({id, techId}: AddOrRemoveSupportPayload) {
    return this.db.software.update({
      where: {
        id: id,
      },
      data: {
        support: {
          disconnect: [{id: techId}],
        }
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
      include: {
        support: true,
        commonIssues: true,
        department: true,
      }
    });
  }
}