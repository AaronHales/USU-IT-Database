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
    const commonIssue = await commonIssuesRepository.updateCommonIssue(req.body)
    res.json({commonIssue: commonIssue})
  })

  router.patch("/:id", authMiddleware, async (req, res) => {
    req.body.id = +req.params.id
    let commonIssue
    if (req.body.removeForeignKeys) {
      commonIssue = await commonIssuesRepository.removeForeignKeys(req.body)
    }
    else if (req.body.addForeignKeys) {
      commonIssue = await commonIssuesRepository.addForeignKeys(req.body)
    }
    res.json({commonIssue: commonIssue})
  })


  router.delete("/:id", authMiddleware, async (req, res) => {
    const commonIssue = await commonIssuesRepository.deleteCommonIssue(+ req.params.id)
    res.json({commonIssue: commonIssue})
  })

  return router;
}

