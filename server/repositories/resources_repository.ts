import { PrismaClient } from "@prisma/client";

export type CreateResourcePayload = {
  descption: string
  link: string|undefined,
  commonIssueId: number|undefined,
  incidentId: [number],
}

export type UpdateResourcePayload = {
  id: number,
  descption: string|undefined
  link: string|undefined,
  commonIssueId: number|undefined,
  incidentId: [number],
}

export type DeleteResourcePayload = {
  id: number,
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


  async createResource({descption, link, commonIssueId, incidentId}: CreateResourcePayload) {
    let resource = await this.db.resource.create({
      data: {
        description: descption,
        link: link,
        commonIssueId: commonIssueId,
      }
    });
    if (incidentId.length > 0 ) {
      incidentId.forEach(id => {
        let incident = this.db.incident.update({
          where: {
            id: id,
          },
          data: {
            resourceId: resource.id
          }
        })
      });
    }
    return this.db.resource.findFirstOrThrow({
      where: {
        id: resource.id,
      },
      include: {
        incidents: true,
      }
    })
  }

  async updateResource({id, descption, link, commonIssueId, incidentId}: UpdateResourcePayload) {
    let resource = await this.db.resource.update({
      where: {
        id: id,
      },
      data: {
        description: descption,
        link: link,
        commonIssueId: commonIssueId,
      }
    })
    if (incidentId.length > 0) {
      incidentId.forEach(id => {
        let incident = this.db.incident.update({
          where: {
            id: id,
          },
          data: {
            resourceId: resource.id
          }
        })
      });
    }
    return this.db.resource.findFirstOrThrow({
      where: {
        id: resource.id,
      },
      include: {
        incidents: true,
      }
    })
  }

  async deleteResource({id}: DeleteResourcePayload) {
    return this.db.resource.delete({
      where: {
        id: id
      }
    })
  }

  async getResourceById(id: number) {
    return this.db.resource.findUnique({
      where: {
        id: id
      },
    });
  }
}