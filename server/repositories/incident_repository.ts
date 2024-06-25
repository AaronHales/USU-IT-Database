import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateIncidentPayload = {
  number: string,
  link: string,
  resourceId: number|undefined,
}

export type UpdateAllOfIncidentPayload = {
    id: number,
    number: string,
    link: string,
    resourceId: number|undefined,
}

export type UpdateSomeOfIncidentPayload = {
    id: number,
    number: string|undefined,
    link: string|undefined,
    resourceId: number|undefined,
}

export class IncidentsRepository {
  private db: PrismaClient
  private static instance: IncidentsRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): IncidentsRepository {
    if (!this.instance) {
      this.instance = new IncidentsRepository(db!!);
    }
    return this.instance;
  }


  async createIncident({number, link, resourceId}: CreateIncidentPayload) {
    return this.db.incident.create({
      data: {
        number: number,
        link: link,
        resourceId: resourceId,
      }
    });
  }

  async updateIncident({id, number, link, resourceId}: UpdateAllOfIncidentPayload) {
    return this.db.incident.update({
        where: {
            id: id,
        },
        data: {
            number: number,
            link: link,
            resourceId: resourceId,
        }
    })
  }

  async patchIncident({id, number, link, resourceId: resourceId}: UpdateSomeOfIncidentPayload) {
    return this.db.incident.update({
        where: {
            id: id,
        },
        data: {
            number: number,
            link: link,
            resourceId: resourceId,
        }
    })
  }

  async deleteIncidentById(id: number) {
    return this.db.incident.delete({
      where: {
        id: id,
      }
    })
  }

  async getIncidentById(id: number) {
    return this.db.incident.findUnique({
      where: {
        id: id
      },
    });
  }
}