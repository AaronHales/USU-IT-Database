import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { DesktopSupportsRepository } from "../repositories/desktopSupports_repository";

// /desktopSupports/...
export const buildDesktopSupportsController = (desktopSupportsRepository: DesktopSupportsRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const desktopSupport = await desktopSupportsRepository.createDesktopSupport(req.body);

    res.json({ desktopSupport: desktopSupport });
  });

  router.get("/:id", async (req, res) => {
    const desktopSupport = await desktopSupportsRepository.getDesktopSupportById(+req.params.id)
    res.json({ desktopSupport: desktopSupport })
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const desktopSupport = await desktopSupportsRepository.updateDesktopSupport(req.body)
    res.json({ desktopSupport: desktopSupport})
  })

  router.patch("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let desktopSupport
    if (req.body.removeForeignKeys) {
        desktopSupport = await desktopSupportsRepository.removeForeignKeys(req.body)
    }
    else if (req.body.addForeignKeys) {
        desktopSupport = await desktopSupportsRepository.addForeignKeys(req.body)
    }

    res.json({ desktopSupport: desktopSupport})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const desktopSupport = await desktopSupportsRepository.deleteDesktopSupport(+req.params.id)
    res.json({ desktopSupport: desktopSupport});
  })


  return router;
}

