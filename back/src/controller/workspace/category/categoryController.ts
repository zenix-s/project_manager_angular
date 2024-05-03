import { Category } from "@/interfaces/interfaces";
import { ModelCategory } from "@/model/modelCategory";
import { Request, Response } from "express";

const modelCategory = new ModelCategory();

export class CategoryController {

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

	public async postCategory(req: Request, res: Response) {
		const idWorkspace = parseInt(req.params.idWorkspace);
		const category:Category = req.body; 
		category.idWorkspace = idWorkspace;
		category.completed = false;

		try {
			const idCategory = await modelCategory.addCategory(category);
			const newCategory:Category = await modelCategory.getCategoryById(idCategory);
			res.json(newCategory);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal server error");
		}
	}


	public async deleteCategory(req: Request, res: Response) {
		const idCategory = parseInt(req.params.idCategory);

		try {
			const category = await modelCategory.getCategoryById(idCategory);
			if (category === undefined) {
				res.status(404).send("Category not found");
				return;
			}
			const deletedId:number =	await modelCategory.deleteCategory(idCategory);
			res.json(deletedId);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal server error");
		}
	}

	public async putCategory(req:Request, res:Response){
		const category:Category = req.body;

		try {
			const idUpdatedCategory = await modelCategory.updateCategory(category);
			const updatedCategory = await modelCategory.getCategoryById(idUpdatedCategory);
			if (updatedCategory === undefined) {
				res.status(404).send("Category not found");
				return;
			}
			res.json(updatedCategory);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal server error");
		}
	}
}
