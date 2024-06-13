import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { CommonIssueRepository } from "../repositories/commonIssue_repository";

// /commonissue/...
export const buildCommonIssueController = (commonIssueRepository: CommonIssueRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const commonIssue = await commonIssueRepository.createCommonIssue(req.body);

    res.json({'sucess': true, commonIssue: commonIssue })
  });

  router.get("/:id", authMiddleware, (req, res) => {
    res.json({ commonIssue: commonIssueRepository.getCommonIssueById(+ req.params.id) });
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = req.params.id
    const commonIssue = await commonIssueRepository.updateCommonIssue(req.body)
    res.json({commonIssue: commonIssue})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const commonIssue = await commonIssueRepository.deleteCommonIssue(+ req.params.id)
    res.json({commonIssue: commonIssue})
  })

  return router;
}

