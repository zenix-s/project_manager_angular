import { Workspace } from "@types";
import { workspaces as data } from "@/assets/data/api/data";

function newUserWorkspace(workspace: Workspace): Workspace {
  workspace.id = 6;
  workspace.createdAt = new Date();

	data.push(workspace);
	return workspace;
}

export default newUserWorkspace;
