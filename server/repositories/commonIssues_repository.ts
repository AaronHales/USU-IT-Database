import { PrismaClient } from "@prisma/client";

export type CreateCommonIssuePayload = {
  problem: string|null|undefined,
  solution: string|null|undefined,
  departmentIds: [number],
  techIds: [number],
  resourceIds: [number],
  softwareId: number|undefined,
}

export type UpdateCommonIssuePayload = {
  id: number|undefined,
  problem: string|null|undefined,
  solution: string|null|undefined,
  departmentIds: [number],
  techIds: [number],
  resourceIds: [number],
  softwareId: number|undefined,
}

export type AddOrRemoveForeignKeysPayload = {
  id: number,
  departmentIds: [number],
  techIds: [number],
  resourceIds: [number],
}

export class CommonIssuesRepository {
  private db: PrismaClient
  private static instance: CommonIssuesRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): CommonIssuesRepository {
    if (!this.instance) {
      this.instance = new CommonIssuesRepository(db!!);
    }
    return this.instance;
  }


  async createCommonIssue({problem, solution, departmentIds, techIds, resourceIds, softwareId}: CreateCommonIssuePayload) {
    return this.db.commonIssue.create({
      data: {
        problem: problem,
        solution: solution,
        departments: {
          connect: departmentIds.map(id => ({id}))
        },
        resources: {
          connect: resourceIds.map(id => ({id}))
        },
        helpers: {
          connect: techIds.map(id => ({id}))
        },
        softwareId: softwareId,
      }
    });
  }

  async updateCommonIssue({id, problem, solution, departmentIds, techIds, resourceIds, softwareId}: UpdateCommonIssuePayload) {
    return this.db.commonIssue.update({
      where: {
        id: id
      },
      data: {
        problem: problem,
        solution: solution,
        departments: {
          connect: departmentIds.map(id => ({id}))
        },
        resources: {
          connect: resourceIds.map(id => ({id}))
        },
        helpers: {
          connect: techIds.map(id => ({id}))
        },
        softwareId: softwareId,
      }
    })
  }

  async addForeignKeys({id, departmentIds, techIds, resourceIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        departments: {
          connect: departmentIds.map(id => ({id}))
        },
        helpers: {
          connect: techIds.map(id => ({id}))
        },
        resources: {
          connect: resourceIds.map(id => ({id}))
        }
      }
    })
  }

  async removeForeignKeys({id, departmentIds, techIds, resourceIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.commonIssue.update({
      where: {
        id: id,
      },
      data: {
        departments: {
          disconnect: departmentIds.map(id => ({id}))
        },
        helpers: {
          disconnect: techIds.map(id => ({id}))
        },
        resources: {
          disconnect: resourceIds.map(id => ({id}))
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