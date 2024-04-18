import { ModelCategory } from "@/model/modelCategory";
import { Request, Response } from "express";

const modelCategory = new ModelCategory();

export class CategoryController {
  private idWorkspace: number;

  constructor() {
    this.idWorkspace = 1;
  }

  public async getCategoriesByWorkspaceId(req: Request, res: Response) {
    const idWorkspace = parseInt(req.params.idWorkspace);

    try {
      const categories = await modelCategory.getCategoriesByIdWorkspace(idWorkspace);
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}
