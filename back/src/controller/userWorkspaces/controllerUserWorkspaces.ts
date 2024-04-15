import express, { Express, Router, Request, Response } from "express";
import getUserWorkspaces from "@/services/userWorkspaces/getUserWorkspaces";
import { Workspace } from "@types";

// /userWorkspaces

/**
 * /userWorkspaces
 * GET: Devuelve todos los workspaces del usuario
 */
export async function getUserWorkspacesController(req: Request, res: Response) {
  const userId = 1;
  try {
    const userWorkspaces = await getUserWorkspaces(userId);
    res.json(userWorkspaces); // Envía la respuesta JSON al cliente
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor"); // Maneja el error
  }
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
