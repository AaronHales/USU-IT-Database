import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ResourcesRepository } from "../repositories/resources_repository";

// /resources/...
export const buildResourcesController = (resourcesRepository: ResourcesRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const resource = await resourcesRepository.createResource(req.body);

    res.json({ resource: resource });
  });

  router.get("/:id", async (req, res) => {
    const resource = await resourcesRepository.getResourceById(+req.params.id)
    res.json({ resource: resource })
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const resource = await resourcesRepository.updateResource(req.body)
    res.json({ resource: resource});
  })

  router.patch("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let resource
    if (req.body.removeForeignKeys) {
      resource = await resourcesRepository.removeForeignKeys(req.body)
    }
    else if (req.body.addForeignKeys) {
        resource = await resourcesRepository.addForeignKeys(req.body)
    }
    res.json({ resource: resource})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const resource = await resourcesRepository.deleteResource(+req.params.id)
    res.json({ resource: resource});
  })


  return router;
}

