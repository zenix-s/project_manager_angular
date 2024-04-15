import { Task } from "@types";

import prisma from "@/lib/prismadb";
export async function addTask(task: Task): Promise<Task> {
	const {
		idWorkspace,
		name,
		description,
		deadline,
		priority,
		visibility
	} = task;
		
	
	try {
		const newTask = await prisma.task.create({
			data: {
				idWorkspace,
				name,
				description,
				deadline,
				priority,
				visibility,
				completed: false,
				createdAt: new Date()
			}
		});
		return newTask as Task;
	} catch (error) {
		console.error(error);
		return {} as Task;
	}
}