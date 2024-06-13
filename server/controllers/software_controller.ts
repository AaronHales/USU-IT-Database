import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { SoftwareRepository } from "../repositories/software_repository";

// /software/...
export const buildSoftwareController = (sofwareRepository: SoftwareRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const software = await sofwareRepository.createSoftware(req.body);

    res.json({'sucess': true, software: software })
  });

  router.get("/:id", authMiddleware, (req, res) => {
    res.json({ software: sofwareRepository.getSoftwareById(+ req.params.id) });
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = req.params.id
    const software = await sofwareRepository.updateSoftware(req.body)
    res.json({software: software})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const software = await sofwareRepository.deleteSoftware(+ req.params.id)
    res.json({software: software})
  })

  return router;
}

