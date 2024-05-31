import { Category } from "@types";
import { ModelCategory } from "@/model/categoryModel";
import { Request, Response } from "express";
import { WorkspaceUsersModel } from "@/model/workspaceUsersModel";
import { checkUserEditPermission } from "@/services/userPermissions";
import { WorkspaceModel } from "@/model/workspaceModel";

const modelCategory = new ModelCategory();
const workspaceModel = new WorkspaceModel();
const workspaceUsersModel = new WorkspaceUsersModel();

export class CategoryController {
  public async getCategoriesByWorkspaceId(req: Request, res: Response) {
    const idWorkspace = parseInt(req.params.idWorkspace);
    const authToken = req.headers.authorization;

    // Comprobamos si el workspace existe
    if (!(await workspaceModel.workspaceExists(idWorkspace))) {
			res.status(404).json({ message: "Workspace not found" });
      return;
    }

    // Comprobamos si el usuario pertenece al workspace
    const workspaceUser = await workspaceUsersModel.getWorkspaceUserByidUser(
      idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      const categories = await modelCategory.getCategoriesByIdWorkspace(
        idWorkspace
      );
      res.json(categories);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }

  public async postCategory(req: Request, res: Response) {
    const authToken = req.headers.authorization;
    const idWorkspace = parseInt(req.params.idWorkspace);
    const category: Category = req.body;
    category.idWorkspace = idWorkspace;
    category.completed = false;

    // Comprobamos si el workspace existe
    if (!(await workspaceModel.workspaceExists(idWorkspace))) {
			res.status(404).json({ message: "Workspace not found" });
      return;
    }

    // Comprobamos si el usuario tiene permisos para crear una categoria
    const workspaceUser = await workspaceUsersModel.getWorkspaceUserByidUser(
      idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      const idCategory = await modelCategory.addCategory(category);
      const newCategory: Category = await modelCategory.getCategoryById(
        idCategory
      );
      res.json(newCategory);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteCategory(req: Request, res: Response) {
    const idCategory = parseInt(req.params.idCategory);
    const authToken = req.headers.authorization;

    // Comprobamos si la categoria existe
    const category = await modelCategory.getCategoryById(idCategory);
    if (category === undefined) {
			res.status(404).json({ message: "Category not found" });
      return;
    }

    // Comprobamos los permisos del usuario
    const workspaceUser = await workspaceUsersModel.getWorkspaceUserByidUser(
      category.idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      const category = await modelCategory.getCategoryById(idCategory);
      if (category === undefined) {
				res.status(404).json({ message: "Category not found" });
        return;
      }
      const deletedId: number = await modelCategory.deleteCategory(idCategory);
      res.json(deletedId);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }

  public async putCategory(req: Request, res: Response) {
    const category: Category = req.body;
    const authToken = req.headers.authorization;

    // Comprobamos si la categoria existe
    const actcategory = await modelCategory.getCategoryById(category.id);
    if (actcategory === undefined) {
			res.status(404).json({ message: "Category not found" });
      return;
    }

    // Comprobamos los permisos del usuario
    const workspaceUser = await workspaceUsersModel.getWorkspaceUserByidUser(
      category.idWorkspace,
      parseInt(authToken as string)
    );

    if (workspaceUser === undefined) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (!checkUserEditPermission(workspaceUser.role)) {
			res.status(403).json({ message: "Unauthorized" });
      return;
    }

    try {
      const idUpdatedCategory = await modelCategory.updateCategory(category);
      const updatedCategory = await modelCategory.getCategoryById(
        idUpdatedCategory
      );
      if (updatedCategory === undefined) {
				res.status(404).json({ message: "Category not found" });
        return;
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
			res.status(500).json({ message: "Internal server error" });
    }
  }
}
