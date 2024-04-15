import { Task, TaskData, Team, User, Category } from "@types";
import prisma from "@/lib/prismadb";

export async function getTasks(workspaceId: number): Promise<TaskData[]> {
  //   const workspaceId = 1;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        idWorkspace: workspaceId,
      },
      include: {
        // Select the category directly instead of including taskCategory
        taskCategory: {
          select: {
            category: true,
          },
        },
        // teamTask: {
        //   : {
        //     team: true,
        //   },
        // },
        // userTask: {
        //   include: {
        //     user: true,
        //   },
        // },
      },
    });
    return tasks as TaskData[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
