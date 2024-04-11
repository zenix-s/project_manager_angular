import { tasks as data } from "@/assets/data/api/workspace/tasks";
import { Task } from "@/interfaces/interfaces";
export function getTasks(workspaceId: number): Task[] {
  console.log("getTasks", workspaceId);
  const tasks: Task[] = data.filter((task) => task.idWorkspace === workspaceId);

  console.log("tasks", tasks);

  return tasks;
}
