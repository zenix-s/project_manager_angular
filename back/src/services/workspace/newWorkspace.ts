import { Workspace } from "@types";
import { userWorkspaces as data } from "@/assets/data/api/workspaces";

function newUserWorkspace(workspace: Workspace): Workspace {
  workspace.id = 6;
  workspace.createdAt = new Date();

	data.push(workspace);
	return workspace;
}

export default newUserWorkspace;
