import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ResponsibilitiesRepository } from "../repositories/responsibilities_repositiory";

// /responsibilities/...
export const buildResponsibilitiesController = (responsibilitiesRepository: ResponsibilitiesRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const responsibilitie = await responsibilitiesRepository.createResponsibility(req.body);

    res.json({ responsibilitie: responsibilitie });
  });

  router.get("/:id", async (req, res) => {
    const responsibilitie = await responsibilitiesRepository.getResponsibilityById(+req.params.id)
    res.json({ responsibilitie: responsibilitie })
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const responsibilitie = await responsibilitiesRepository.updateResponsibility(req.body)
    res.json({ responsibilitie: responsibilitie});
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const responsibilitie = await responsibilitiesRepository.deleteResponsibility(req.body)
    res.json({ responsibilitie: responsibilitie});
  })


  return router;
}

