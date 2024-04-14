import { Workspace } from "@types";
import { userWorkspaces as data } from "@/assets/data/api/userWorkspaces/userWorkspaces";

function newUserWorkspace(workspace: Workspace): Workspace {
  workspace.id = 6;
  workspace.createdAt = new Date();

	data.push(workspace);
	return workspace;
}

export default newUserWorkspace;
