import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ExtensionsRepository } from "../repositories/extensions_repository";

// /extensions/...
export const buildExtensionsController = (extensionsRepository: ExtensionsRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const extension = await extensionsRepository.createExtension(req.body);

    res.json({ extension: extension });
  });

  router.get("/:id", async (req, res) => {
    const extension = await extensionsRepository.getExtensionById(+req.params.id)
    res.json({ extension: extension })
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const extension = await extensionsRepository.updateExtension(req.body)
    res.json({ extension: extension})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const extension = await extensionsRepository.deleteExtension(+req.params.id)
    res.json({ extension: extension});
  })


  return router;
}

