import { PrismaClient } from "@prisma/client";

export type CreateResourcePayload = {
  descption: string
  link: string|undefined,
  commonIssueId: number|undefined,
  incidentIds: [number],
}

export type UpdateResourcePayload = {
  id: number,
  descption: string|undefined
  link: string|undefined,
  commonIssueId: number|undefined,
  incidentIds: [number],
}

export type AddOrRemoveForeignKeysPayload = {
  id: number,
  incidentIds: [number],
}

export class ResourcesRepository {
  private db: PrismaClient
  private static instance: ResourcesRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ResourcesRepository {
    if (!this.instance) {
      this.instance = new ResourcesRepository(db!!);
    }
    return this.instance;
  }


  async createResource({descption, link, commonIssueId, incidentIds}: CreateResourcePayload) {
    return this.db.resource.create({
      data: {
        description: descption,
        link: link,
        commonIssueId: commonIssueId,
        incidents: {
          connect: incidentIds.map(id => ({id}))
        }
      },
      include: {
        commonIssue: true,
      }
    })
  }

  async updateResource({id, descption, link, commonIssueId, incidentIds}: UpdateResourcePayload) {
    return this.db.resource.update({
      where: {
        id: id,
      },
      data: {
        description: descption,
        link: link,
        commonIssueId: commonIssueId,
        incidents: {
          connect: incidentIds.map(id => ({id}))
        }
      },
      include: {
        commonIssue: true,
      }
    })
  }

  async addForeignKeys({id, incidentIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.resource.update({
      where: {
        id: id,
      },
      data: {
        incidents: {
          connect: incidentIds.map(id => ({id}))
        }
      },
      include: {
        commonIssue: true,
      }
    })
  }

  async removeForeignKeys({id, incidentIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.resource.update({
      where: {
        id: id,
      },
      data: {
        incidents: {
          disconnect: incidentIds.map(id => ({id}))
        }
      },
      include: {
        commonIssue: true,
      }
    })
  }

  async deleteResource(id: number) {
    return this.db.resource.delete({
      where: {
        id: id
      },
      include: {
        commonIssue: true,
      }
    })
  }

  async getResourceById(id: number) {
    return this.db.resource.findUnique({
      where: {
        id: id
      },
      include: {
        commonIssue: true,
      }
    });
  }
}