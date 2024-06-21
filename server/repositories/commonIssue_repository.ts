import { PrismaClient } from "@prisma/client";

export type CreateCommonIssuePayload = {
}

export type UpdateCommonIssuePayload = {
  id: number|undefined,
  problem: string|null|undefined,
  solution: string|null|undefined,
  department: {
    id: number|undefined,
    name: string,
    abbreviation: string|undefined,
    departmentCode: string|undefined,
    extension: number|undefined,
    email: string|undefined,
    parentDepartmentId: number|undefined,
  }
}

export type AddOrRemoveDepartmentPayload = {
  id: number,
  departmentId: number,
}

export type AddOrRemoveSoftwarePayload = {
  id: number,
  softwareId: number,
}

export type AddOrRemoveHelperPayload = {
  id: number,
  techId: number,
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


  async createCommonIssue({}: CreateCommonIssuePayload) {
    return this.db.commonIssue.create({
      data: {
        
      }
    });
  }

  async updateCommonIssue({id, problem, solution, department}: UpdateCommonIssuePayload) {
    return this.db.commonIssue.update({
      where: {
        id: id
      },
      data: {
        problem: problem,
        solution: solution,
        departments: {
          connectOrCreate: {
            where: {
              id: department.id,
            },
            create: {
              name: department.name,
              abbreviation: department.abbreviation,
              departmentCode: department.departmentCode,
              extension: department.extension,
              email: department.email,
              parentDepartmentId: department.parentDepartmentId,
            }
            
          }
        }
      }
    })
  }

  async addDepartment({id, departmentId}: AddOrRemoveDepartmentPayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        departments: {
          connect: {id: departmentId}
        }
      }
    })
  }

  async removeDepartment({id, departmentId}: AddOrRemoveDepartmentPayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        departments: {
          disconnect: {id: departmentId}
        }
      }
    })
  }

  async addSoftware({id, softwareId}: AddOrRemoveSoftwarePayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        softwareId: softwareId
      }
    })
  }

  async removeSoftware({id, softwareId}: AddOrRemoveSoftwarePayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        softwareId: null
      }
    })
  }

  async addHelper({id, techId}: AddOrRemoveHelperPayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        helpers: {
          connect: {id: techId}
        }
      }
    })
  }

  async removeHelper({id, techId}: AddOrRemoveHelperPayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        helpers: {
          disconnect: {id: techId}
        }
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
      include: {
        resources: true,
        departments: true,
        software: true,
      }
    });
  }
}