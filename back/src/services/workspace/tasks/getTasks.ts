import { tasks as data } from "@/assets/data/api/tasks";
import { Task, TaskData, Team, User, Category } from "@types";

export function getTasks(workspaceId: number): TaskData[] {
  const tasks: Task[] = data.filter((task) => task.idWorkspace === workspaceId);

  const tasksData: TaskData[] = tasks.map((task) => {
    const categories: Category[] = [];
    const teams: Team[] = [];
    const users: User[] = [];

    return {
      ...task,
      categories,
      teams,
      users,
    };
  });

  return tasksData;
}
