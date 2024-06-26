import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ResponsibilitiesRepository } from "../repositories/responsibilities_repositiory";

// /responsibilities/...
export const buildResponsibilitiesController = (responsibilitiesRepository: ResponsibilitiesRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const responsibility = await responsibilitiesRepository.createResponsibility(req.body);

    res.json({ responsibility: responsibility });
  });

  router.get("/:id", async (req, res) => {
    const responsibility = await responsibilitiesRepository.getResponsibilityById(+req.params.id)
    res.json({ responsibility: responsibility })
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const responsibility = await responsibilitiesRepository.updateResponsibility(req.body)
    res.json({ responsibility: responsibility});
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const responsibility = await responsibilitiesRepository.deleteResponsibility(req.body)
    res.json({ responsibility: responsibility});
  })


  return router;
}

