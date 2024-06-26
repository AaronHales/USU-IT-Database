import { PrismaClient } from "@prisma/client";

export type CreateDesktopSupportPayload = {
  name: string,
  deskPhone: number|undefined,
  cellPhone: number|undefined,
  email: string|undefined,
  commonIssueIds: [number], 
  softwareIds: [number],
  deptartmentIds: [number],
}

export type UpdateDesktopSupportPayload = {
  id: number,
  name: string,
  deskPhone: number|undefined,
  cellPhone: number|undefined,
  email: string|undefined,
  commonIssueIds: [number], 
  softwareIds: [number],
  deptartmentIds: [number],
}

export type AddOrRemoveForeignKeysPayload = {
  id: number,
  commonIssueIds: [number], 
  softwareIds: [number],
  deptartmentIds: [number],
}

export type DeleteDesktopSupportPayload = {
  id: number,
}

export class DesktopSupportsRepository {
  private db: PrismaClient
  private static instance: DesktopSupportsRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): DesktopSupportsRepository {
    if (!this.instance) {
      this.instance = new DesktopSupportsRepository(db!!);
    }
    return this.instance;
  }


  async createDesktopSupport({name, deskPhone, cellPhone, email, commonIssueIds, softwareIds, deptartmentIds}: CreateDesktopSupportPayload) {
    return this.db.desktopSupport.create({
      data: {
        name: name,
        deskPhone: deskPhone,
        cellPhone: cellPhone,
        email: email,
        software: {
          connect: softwareIds.map(id => ({id}))
        },
        department: {
          connect: deptartmentIds.map(id => ({id}))
        },
        commonIssue: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        software: true,
        department: true,
        commonIssue: true,
      }
    });
  }

  async updateDesktopSupport({id, name, deskPhone, cellPhone, email, commonIssueIds, softwareIds, deptartmentIds}: UpdateDesktopSupportPayload) {
    return this.db.desktopSupport.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        deskPhone: deskPhone,
        cellPhone: cellPhone,
        email: email,
        software: {
          connect: softwareIds.map(id => ({id}))
        },
        department: {
          connect: deptartmentIds.map(id => ({id}))
        },
        commonIssue: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        software: true,
        department: true,
        commonIssue: true,
      }
    })
  }

  async addForeignKeys({id, commonIssueIds, softwareIds, deptartmentIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.desktopSupport.update({
      where: {
        id: id,
      },
      data: {
        software: {
          connect: softwareIds.map(id => ({id}))
        },
        department: {
          connect: deptartmentIds.map(id => ({id}))
        },
        commonIssue: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        software: true,
        department: true,
        commonIssue: true,
      }
    })
  }

  async removeForeignKeys({id, commonIssueIds, softwareIds, deptartmentIds}: AddOrRemoveForeignKeysPayload) {
    return this.db.desktopSupport.update({
      where: {
        id: id,
      },
      data: {
        software: {
          disconnect: softwareIds.map(id => ({id}))
        },
        department: {
          disconnect: deptartmentIds.map(id => ({id}))
        },
        commonIssue: {
          disconnect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        software: true,
        department: true,
        commonIssue: true,
      }
    })
  }

  async deleteDesktopSupport({id}: DeleteDesktopSupportPayload) {
    return this.db.desktopSupport.delete({
      where: {
        id: id
      },
      include: {
        software: true,
        department: true,
        commonIssue: true,
      }
    })
  }

  async getDesktopSupportById(id: number) {
    return this.db.desktopSupport.findUnique({
      where: {
        id: id
      },
      include: {
        software: true,
        department: true,
        commonIssue: true,
      }
    });
  }
}