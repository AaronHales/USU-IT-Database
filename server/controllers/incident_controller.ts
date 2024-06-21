import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authentication";
import { IncidentsRepository } from "../repositories/incident_repository";

// /incidents/...
export const buildIncidentController = (incidentRepository: IncidentsRepository) => {
  const router = Router();

  router.post("/", authMiddleware, async (req, res) => {
    const incident = await incidentRepository.createIncident(req.body);

    res.json({ incident });
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const incident = await incidentRepository.getIncidentById(req.body);

    res.json({ incident: incident });
  })

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    const incident = await incidentRepository.updateIncident(req.body);

    res.json({ incident: incident });
  })
  

  return router;
}

