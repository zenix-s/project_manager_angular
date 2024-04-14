import { tasks as data } from "@/assets/data/api/tasks";
import { Task } from "@/interfaces/interfaces";
export function getTasks(workspaceId: number): Task[] {
  const tasks: Task[] = data.filter((task) => task.idWorkspace === workspaceId);

  return tasks;
}
