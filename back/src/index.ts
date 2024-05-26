import bodyParser from "body-parser";
import express, { Express } from "express";
import { CategoryController } from "@/controller/categoryController";
import { WorkspaceController } from "@/controller/workspaceController";
import { TaskController } from "@/controller/taskController";
import { TaskCategoryController } from "@/controller/taskCategoryController";
import { AuthenticationController } from "@/controller/authenticationController";
import { InvitationController } from '@/controller/invitationsController';

process.loadEnvFile();
const app: Express = express();
const port = process.env.PORT || 5000;

const workspaceController = new WorkspaceController();
const taskController = new TaskController();
const categoryController = new CategoryController();
const taskCategoryController = new TaskCategoryController();
const authenticationController = new AuthenticationController();
const invitationController = new InvitationController();

// MIDLEWARES
app.use(bodyParser.json());

// ROUTERS
/**
 * Devuelve los workspaces de un usuario
 */
app.get("/userWorkspaces", workspaceController.getWorkspacesByIdUserController);
// app.delete("/userWorkspaces/:id", userWorkspacesController.deleteUserWorkspacesController);
// app.put("/userWorkspaces/:id", userWorkspacesController.putUserWorkspacesController);

/**
 * Elimina un workspace
 */
app.delete("/workspace/:idWorkspace", workspaceController.deleteWorkspace);

/**
 * Devuelve las tareas de un workspace
 */
app.get("/workspace/:idWorkspace/task", taskController.getWorkspaceTasks);

/**
 * Crea una tarea en un workspace
 */
app.post("/workspace/:idWorkspace/task", taskController.postTaskController);

/**
 * Devuelve las categorias de un workspace
 */
app.get(
  "/workspace/:idWorkspace/categories",
  categoryController.getCategoriesByWorkspaceId
);
/**
 * Crea una categoria en un workspace
 */
app.post("/workspace/:idWorkspace/categories", categoryController.postCategory);

/**
 * Crea un workspace
 */
app.post("/workspace", workspaceController.postWorkspace);

/**
 * Elimina una tarea
 */
app.delete("/task/:idTask", taskController.deleteTask);
/**
 * Actualiza una tarea
 */
app.put("/task/:idTask", taskController.putTask);

/**
 * Elimina una categoria
 */
app.delete("/category/:idCategory", categoryController.deleteCategory);
/**
 * Actualiza una categoria
 */
app.put("/category/:idCategory", categoryController.putCategory);

/**
 * Asigna una categoria a una tarea
 */
app.post("/taskCategory", taskCategoryController.postTaskCategory);

/**
 * Elimina una categoria de una tarea
 */
app.delete("/taskCategory/:idTask/:idCategory", taskCategoryController.deleteTaskCategory);

/**
 * Login
 */
app.post("/login", authenticationController.login);
/**
 * Registro
 */
app.post("/register", authenticationController.register);

/**
 * Devuelve los usuarios asociados a un workspace
 */
app.get("/workspace/:idWorkspace/users", workspaceController.getWorkspaceUsers);

/**
 * Devuelve las invitaciones de un usuario
 */
app.get("/userInvitations", invitationController.getInvitationsByIdUser);

/**
 * Acepta una invitación
 */
app.put("/invitation/:id", invitationController.acceptInvitation);

/**
 * Rechaza una invitación
 */
app.delete("/invitation/:id", invitationController.rejectInvitation);

/**
 * Crea una invitación
 */
app.post("/invitation", invitationController.postInvitation);


app.listen(port, () => console.log("Server running on port " + port));
