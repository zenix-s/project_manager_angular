import express, { Express, Router, Request, Response } from "express";
import getUserWorkspaces from "@/services/userWorkspaces/getUserWorkspaces";
import { Workspace } from "@types";

// /userWorkspaces

/**
 * /userWorkspaces
 * GET: Devuelve todos los workspaces del usuario
 */
export function getUserWorkspacesController(req: Request, res: Response) {
  const userId = 1;
  const userWorkspaces = getUserWorkspaces(userId);
  res.send(userWorkspaces);
}

/**
 * /userWorkspaces
 * POST: Crea un nuevo workspace
 *
 */


// Modificar un workspace
// router.put("/:id", (req, res) => {
//   res.send("Modificar workspace");
// });
export function putUserWorkspacesController(req: Request, res: Response) {
  res.send("Modificar workspace");
}

// Eliminar un workspace
// router.delete("/:id", (req, res) => {
//   res.send("Eliminar workspace");
// });
export function deleteUserWorkspacesController(req: Request, res: Response) {
  res.send("Eliminar workspace");
}
