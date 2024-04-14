import { Task } from "@types";

import { tasks as data } from "@/assets/data/api/tasks";

export function addTask(task: Task): Task {
	console.log("addTask", task);

	task.id = data.length + 1;

	data.push(task);

	return task;
}