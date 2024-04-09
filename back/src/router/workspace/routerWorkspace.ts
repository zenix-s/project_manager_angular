import express, { Request, Response, Router } from "express";
import taskRouter from "@/router/workspace/task/routerTasks";
import teamRouter from "@/router/workspace/team/routerTeam";
import categoryRouter from "@/router/workspace/category/routerCategory";

const router: Router = express.Router();

// /workspace/:idWorkspace

router.use("/task", taskRouter);
router.use("/team", teamRouter);
router.use("/category", categoryRouter);




export default router;
