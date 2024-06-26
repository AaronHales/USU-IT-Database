import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { CommonIssuesRepository } from "../repositories/commonIssues_repository";

// /commonissues/...
export const buildCommonIssuesController = (commonIssuesRepository: CommonIssuesRepository) => {
  const router = Router();

  router.post("/", authMiddleware, async (req, res) => {
    const commonIssue = await commonIssuesRepository.createCommonIssue(req.body);

    res.json({'sucess': true, commonIssue: commonIssue })
  });

  router.get("/:id", authMiddleware, (req, res) => {
    res.json({ commonIssue: commonIssuesRepository.getCommonIssueById(+req.params.id) });
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let commonIssue
    if (req.body.addSoftware) {
      commonIssue = await commonIssuesRepository.addSoftware(req.body)
    }
    else if (req.body.removeSoftware) {
      commonIssue = await commonIssuesRepository.removeSoftware(req.body)
    }
    if (req.body.addDepartment) {
      commonIssue = await commonIssuesRepository.addDepartment(req.body)
    }
    else if (req.body.removeDepartment) {
      commonIssue = await commonIssuesRepository.removeDepartment(req.body)
    }
    if (req.body.addHelper) {
      commonIssue = await commonIssuesRepository.addHelper(req.body)
    }
    else if (req.body.removeHelper) {
      commonIssue = await commonIssuesRepository.removeHelper(req.body)
    }
    commonIssue = await commonIssuesRepository.updateCommonIssue(req.body)
    res.json({commonIssue: commonIssue})
  })

  router.delete("/:id", authMiddleware, async (req, res) => {
    const commonIssue = await commonIssuesRepository.deleteCommonIssue(+ req.params.id)
    res.json({commonIssue: commonIssue})
  })

  return router;
}

