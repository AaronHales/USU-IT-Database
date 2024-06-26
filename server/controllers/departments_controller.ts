import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { DepartmentsRepository } from "../repositories/departments_repository";

// /departments/...
export const buildDepartmentsController = (departmentsRepository: DepartmentsRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const department = await departmentsRepository.createDepartment(req.body);

    res.json({ department: department });
  });

  router.get("/:id", async (req, res) => {
    const department = await departmentsRepository.getDepartmentById(+req.params.id)
    res.json({ department: department })
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const department = await departmentsRepository.updateDepartment(req.body)
    res.json({ department: department})
  })

  router.patch("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let department
    if (req.body.removeForeignKeys) {
        department = await departmentsRepository.removeForeignKeys(req.body)
    }
    else if (req.body.addForeignKeys) {
        department = await departmentsRepository.addForeignKeys(req.body)
    }

    res.json({ department: department})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const department = await departmentsRepository.deleteDepartment(+req.params.id)
    res.json({ department: department});
  })


  return router;
}

