import { Request, Response } from "express";
import { Workspace } from "@types";
import { WorkspaceModel } from "@/model/workspaceModel";
import { WorkspaceUsersModel } from "@/model/workspaceUsersModel";
import { UserModel } from "@/model/userModel";
import { Role } from "../interfaces/interfaces";
import {
  checkUserAdminPermission,
  checkUserEditPermission,
} from "@/services/userPermissions";

const modelWorkspace = new WorkspaceModel();
const modelWorkspaceUsers = new WorkspaceUsersModel();
const userModel = new UserModel();

export class WorkspaceController {
  public async getWorkspacesByIdUserController(req: Request, res: Response) {
    try {
      const idUser = parseInt(req.headers.authorization as string);
      res.json(await modelWorkspace.getWorkspacesByIdUser(idUser));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteWorkspace(req: Request, res: Response) {
    const idWorkspace: number = parseInt(req.params.idWorkspace);
    const authToken = req.headers.authorization;

    // Comprobar si el usuario tiene permisos de administrador para eliminar el workspace
    const workspaceUser = await modelWorkspaceUsers.getWorkspaceUserByidUser(
      idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (!checkUserAdminPermission(workspaceUser.role)) {
      res
        .status(403)
        .json({ message: "Se necesita permisos de administrador" });
      return;
    }

    try {
      const deletedIdWorkspace: number = await modelWorkspace.deleteWorkspace(
        idWorkspace
      );
      res.json({
        deleted: deletedIdWorkspace,
        message: "workspace eliminado con id: " + deletedIdWorkspace + "",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async postWorkspace(req: Request, res: Response) {
    const workspace: Workspace = req.body;
    const idUser = parseInt(req.headers.authorization as string);

    try {
      const idWorkspace: number = await modelWorkspace.addWorkspace(
        idUser,
        workspace
      );
      if (await modelWorkspace.workspaceExists(idWorkspace)) {
        res.status(201).json({
          id: idWorkspace,
          message: "Workspace created",
        });
      } else {
        res.status(400).json({
          message: "Workspace not created",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getWorkspaceUsers(req: Request, res: Response) {
    const idWorkspace: number = parseInt(req.params.idWorkspace);

    try {
      const workspaceUsers = await modelWorkspaceUsers.getWorkspaceUsers(
        idWorkspace
      );
      res.json(workspaceUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteWorkspaceUser(req: Request, res: Response) {
    // const idUser = parseInt(req.headers.authorization as string);
    // const idWorkspace = parseInt(req.headers.idworkspace as string);
    // const idUserToDelete = parseInt(req.headers.iduser as string);

    // const workspaceUser = await modelWorkspaceUsers.getWorkspaceUserByidUser(
    //   idWorkspace,
    //   idUser
    // );

    // if (workspaceUser === undefined) {
    //   res.status(403).json({ message: "Unauthorized" });
    //   return;
    // }

    // if (!checkUserAdminPermission(workspaceUser.role)) {
    //   res
    //     .status(403)
    //     .json({ message: "Se necesita permisos de administrador" });
    //   return;
    // }

    // try {
    //   await modelWorkspaceUsers.deleteWorkspaceUser(
    //     idWorkspace,
    //     idUserToDelete
    //   );
    //   res.json({ message: "Usuario eliminado del workspace" });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: "Internal server error" });
    // }
		res.status(200).json({ message: "Unimplemented" });
  }
}
