import express, { Express, Request, Response } from "express";
import { listTasks } from "@/controller/tasksController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("ver tareas");
});

router.get("/:projectId", listTasks);

export default router;
