import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { SoftwareRepository } from "../repositories/software_repository";

// /software/...
export const buildSoftwareController = (softwareRepository: SoftwareRepository) => {
  const router = Router();

  router.post("/", authMiddleware, async (req, res) => {
    const software = await softwareRepository.createSoftware(req.body);

    res.json({'sucess': true, software: software })
  });

  router.get("/:id", authMiddleware, (req, res) => {
    res.json({ software: softwareRepository.getSoftwareById(+req.params.id) });
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const software = await softwareRepository.updateSoftware(req.body)
    res.json({software: software})
  })

  router.patch("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let software
    if (req.body.removeForeignKeys) {
      software = await softwareRepository.removeForeignKeys(req.body)
    }
    else if (req.body.addForeignKeys) {
      software = await softwareRepository.addForeignKeys(req.body)
    }
    
    res.json({software: software})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const software = await softwareRepository.deleteSoftware(+ req.params.id)
    res.json({software: software})
  })

  return router;
}

