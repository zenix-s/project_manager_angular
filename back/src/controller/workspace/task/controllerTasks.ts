import express, { Express, Request, Response, Router } from "express";

import { getTasks } from "@/services/workspace/tasks/getTasks";

const router:Router = express.Router();



// /workspace/:idWorkspace/tasks

router.get("/", (req: Request, res: Response) => {
	const workspaceId:number = parseInt(req.params.idWorkspace);
  const tasks = getTasks(workspaceId);
	res.send(tasks);
});


router.get("/:projectId", (req:Request, res:Response) => {
	
	res.send("ver tareas de un proyecto");
});

export default router;
