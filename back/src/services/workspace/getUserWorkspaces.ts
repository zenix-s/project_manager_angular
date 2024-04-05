import { Workspace } from "@/interfaces/interfaces";
import { pool } from "@/config/dbconfig";


async function  getUserWorkspaces(userId: number){
	// const query = `SELECT w.id, w.name, w.description, uw.createdAt
	// FROM workspace w
	// JOIN userWorkspace uw ON w.id = uw.workspace_id
	// WHERE uw.user_id = ?`;

	const query = 'SELECT * FROM workspace'

	console.log(query);

	// return pool.query(query, [userId])
	// 	.then(([result]: any) => {
	// 		// const workspaces: Workspace = result;
	// 		return result;
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		return null;
	// 	});

	const result = await pool.query(query);
	console.log(result);

	return "Workspaces"

}

export default getUserWorkspaces;
