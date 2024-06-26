import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { IncidentsRepository } from "../repositories/incidents_repository";

// /incidents/...
export const buildIncidentsController = (incidentRepository: IncidentsRepository) => {
  const router = Router();

  router.post("/", authMiddleware, async (req, res) => {
    const incident = await incidentRepository.createIncident(req.body);

    res.json({ incident });
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    const incident = await incidentRepository.getIncidentById(+req.params.id);

    res.json({ incident: incident });
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let incident
    if (req.body.addOrRemoveResource) {
      incident = await incidentRepository.addOrRemoveResource(req.body);
    }
    incident = await incidentRepository.updateIncident(req.body);

    res.json({ incident: incident });
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const incident = await incidentRepository.deleteIncidentById(+req.params.id)

    res.json({ incident: incident});
  })
  

  return router;
}

