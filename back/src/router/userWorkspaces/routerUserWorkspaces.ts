import express, { Express, Router, Request, Response } from "express";
import {
  getUserWorkspacesController,
  postUserWorkspacesController,
  deleteUserWorkspacesController,
  putUserWorkspacesController,
} from "@/controller/userWorkspaces/controllerUserWorkspaces";

const router: Router = express.Router();

// /userWorkspaces

/**
 * /userWorkspaces
 * GET: Devuelve todos los workspaces del usuario
 */
router.get("/", getUserWorkspacesController);

/**
 * /userWorkspaces
 * POST: Crea un nuevo workspace
 */
router.post("/", postUserWorkspacesController);

// Modificar un workspace
router.put("/:id", putUserWorkspacesController);

// Eliminar un workspace
router.delete("/:id", deleteUserWorkspacesController);

export default router;
