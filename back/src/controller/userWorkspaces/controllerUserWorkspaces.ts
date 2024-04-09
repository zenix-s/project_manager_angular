import express, { Express, Router, Request, Response } from "express";
import getUserWorkspaces from "@/services/userWorkspaces/getUserWorkspaces";
import newUserWorkspace from "@/services/userWorkspaces/newUserWorkspace";
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
export function postUserWorkspacesController(req: Request, res: Response) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  try {
    const workspace: Workspace = req.body;
    res.status(201).send(newUserWorkspace(workspace));
  } catch (error) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

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
