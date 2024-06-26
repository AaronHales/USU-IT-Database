import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
config();


async function main() {
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })

  await prisma.department.upsert({
    where: {
      id: 1,
    },
    create: {
      name: "Information Technology",
      abbreviation: "IT",
      departmentCode: "DPINFT",
      phoneNumbers: {
        connectOrCreate: {
          where: {
            id: 1,
            phoneNumber: "4357974357"
          },
          create: {
            phoneNumber: "4357974357",
          }
        }
      },
      email: "servicedesk@usu.edu",
      subDepartments: {
        connectOrCreate: {
          where: {
            id: 2,
            name: "Service Desk"
          },
          create: {
            name: "IT Service Desk",
            email: "servicedesk@usu.edu",
            phoneNumbers: {
              connectOrCreate: {
                where: {
                  id: 1,
                  phoneNumber: "4357974357",
                },
                create: {
                  phoneNumber: "4357974357",
                }
              }
            },
          }
        }
      }
    },
    update: {
      name: "Information Technology",
      abbreviation: "IT",
      departmentCode: "DPINFT",
      phoneNumbers: {
        connectOrCreate: {
          where: {
            id: 1,
            phoneNumber: "4357974357"
          },
          create: {
            phoneNumber: "4357974357",
          }
        }
      },
      email: "servicedesk@usu.edu",
      subDepartments: {
        connectOrCreate: {
          where: {
            id: 2,
            name: "Service Desk"
          },
          create: {
            name: "IT Service Desk",
            email: "servicedesk@usu.edu",
            phoneNumbers: {
              connectOrCreate: {
                where: {
                  id: 1,
                  phoneNumber: "4357974357",
                },
                create: {
                  phoneNumber: "4357974357",
                }
              }
            },
          }
        }
      }
    }
  })
  // TODO: put default data in the database
  console.log(process.env);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })