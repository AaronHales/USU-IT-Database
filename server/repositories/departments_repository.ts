import { PrismaClient } from "@prisma/client";

export type CreateDepartmentPayload = {
  name: string,
  abbreviation: string|undefined,
  departmentCode: string|undefined,
  phoneNumberIds: [number],
  email: string|undefined,
  parentDepartmentId: number|undefined,
  subDepartmentIds: [number],
  responsibilityIds: [number],
  techIds: [number],
  commonIssueIds: [number],
  softwareIds: [number],
}

export type UpdateDepartmentPayload = {
  id: number,
  name: string,
  abbreviation: string|undefined,
  departmentCode: string|undefined,
  phoneNumberIds: [number],
  email: string|undefined,
  parentDepartmentId: number|undefined,
  subDepartmentIds: [number],
  responsibilityIds: [number],
  techIds: [number],
  commonIssueIds: [number],
  softwareIds: [number],
}

export type AddOrRemoveForeignKeysPayload = {
  id: number,
  phoneNumberIds: [number],
  subDepartmentIds: [number],
  responsibilityIds: [number],
  techIds: [number],
  commonIssueIds: [number],
  softwareIds: [number],

}

export class DepartmentsRepository {
  private db: PrismaClient
  private static instance: DepartmentsRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): DepartmentsRepository {
    if (!this.instance) {
      this.instance = new DepartmentsRepository(db!!);
    }
    return this.instance;
  }


  async createDepartment({
      name, abbreviation, departmentCode, phoneNumberIds, email, subDepartmentIds,
      parentDepartmentId, responsibilityIds, techIds, commonIssueIds, softwareIds
    }: CreateDepartmentPayload) {
    return this.db.department.create({
      data: {
        name: name,
        abbreviation: abbreviation,
        departmentCode: departmentCode,
        email: email,
        parentDepartmentId: parentDepartmentId,
        phoneNumbers: {
          connect: phoneNumberIds.map(id => ({id}))
        },
        subDepartments: {
          connect: subDepartmentIds.map(id => ({id}))
        },
        responsibilities: {
          connect: responsibilityIds.map(id => ({id}))
        },
        techs: {
          connect: techIds.map(id => ({id}))
        },
        software: {
          connect: softwareIds.map(id => ({id}))
        },
        commonIssues: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        phoneNumbers: true,
        subDepartments: true,
        responsibilities: true,
        techs: true,
        software: true,
        commonIssues: true,
      }
    });
  }

  async updateDepartment(
    {
      id, name, abbreviation, departmentCode, phoneNumberIds, email, subDepartmentIds,
      parentDepartmentId, responsibilityIds, techIds, commonIssueIds, softwareIds
    }: UpdateDepartmentPayload) {
    return this.db.department.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        abbreviation: abbreviation,
        departmentCode: departmentCode,
        email: email,
        parentDepartmentId: parentDepartmentId,
        phoneNumbers: {
          connect: phoneNumberIds.map(id => ({id}))
        },
        subDepartments: {
          connect: subDepartmentIds.map(id => ({id}))
        },
        responsibilities: {
          connect: responsibilityIds.map(id => ({id}))
        },
        techs: {
          connect: techIds.map(id => ({id}))
        },
        software: {
          connect: softwareIds.map(id => ({id}))
        },
        commonIssues: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        phoneNumbers: true,
        subDepartments: true,
        responsibilities: true,
        techs: true,
        software: true,
        commonIssues: true,
      }
    })
  }

  async addForeignKeys(
    {
      id, phoneNumberIds, subDepartmentIds, responsibilityIds, techIds, commonIssueIds, softwareIds
    }: AddOrRemoveForeignKeysPayload) {
    return this.db.department.update({
      where: {
        id: id,
      },
      data: {
        phoneNumbers: {
          connect: phoneNumberIds.map(id => ({id}))
        },
        subDepartments: {
          connect: subDepartmentIds.map(id => ({id}))
        },
        responsibilities: {
          connect: responsibilityIds.map(id => ({id}))
        },
        techs: {
          connect: techIds.map(id => ({id}))
        },
        software: {
          connect: softwareIds.map(id => ({id}))
        },
        commonIssues: {
          connect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        phoneNumbers: true,
        subDepartments: true,
        responsibilities: true,
        techs: true,
        software: true,
        commonIssues: true,
      }
    })
  }

  async removeForeignKeys(
    {
      id, phoneNumberIds, subDepartmentIds, responsibilityIds, techIds, commonIssueIds, softwareIds
    }: AddOrRemoveForeignKeysPayload) {
    return this.db.department.update({
      where: {
        id: id,
      },
      data: {
        phoneNumbers: {
          disconnect: phoneNumberIds.map(id => ({id}))
        },
        subDepartments: {
          connect: subDepartmentIds.map(id => ({id}))
        },
        responsibilities: {
          disconnect: responsibilityIds.map(id => ({id}))
        },
        techs: {
          disconnect: techIds.map(id => ({id}))
        },
        software: {
          disconnect: softwareIds.map(id => ({id}))
        },
        commonIssues: {
          disconnect: commonIssueIds.map(id => ({id}))
        }
      },
      include: {
        phoneNumbers: true,
        subDepartments: true,
        responsibilities: true,
        techs: true,
        software: true,
        commonIssues: true,
      }
    })
  }

  async deleteDepartment(id: number) {
    return this.db.department.delete({
      where: {
        id: id
      },
      include: {
        phoneNumbers: true,
        subDepartments: true,
        responsibilities: true,
        techs: true,
        software: true,
        commonIssues: true,
      }
    })
  }

  async getDepartmentById(id: number) {
    return this.db.department.findUnique({
      where: {
        id: id
      },
      include: {
        phoneNumbers: true,
        subDepartments: true,
        responsibilities: true,
        techs: true,
        software: true,
        commonIssues: true,
      }
    });
  }
}