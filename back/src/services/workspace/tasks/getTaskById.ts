import { Task } from "@types";
import { tasks as data } from "@/assets/data/api/workspace/tasks";
export function getTaskById(taskId: number): Task | undefined {
  if (taskId === undefined) {
    return undefined;
  }

  return data.find((task) => task.id === taskId);
}
