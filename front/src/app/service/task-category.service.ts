import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { backendUrl, port } from '@env';
import { TasksService } from './workspace-tasks.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class TaskCategoryService {
  // constructor() {}

  // http = inject(HttpClient);
  // taskService = inject(TasksService);
  // categoryService = inject(CategoryService);

  // addCategoryToTask(
  //   {
  //     idTask,
  //     idCategory,
  //   }: {
  //     idTask: number;
  //     idCategory: number;
  //   },
  //   idWorkspace: number
  // ) {
  //   // console.log('addCategoryToTask', {
  //   //   idTask,
  //   //   idCategory,
  //   // });
  //   this.http
  //     .post(`${backendUrl}:${port}/taskCategory`, {
  //       idTask,
  //       idCategory,
  //     })
  //     .subscribe(() => {
  //       this.taskService.getTasks(idWorkspace);
  //     });
  // }

  // removeCategoryFromTask(
  //   {
  //     idTask,
  //     idCategory,
  //   }: {
  //     idTask: number;
  //     idCategory: number;
  //   },
  //   idWorkspace: number
  // ) {
  //   console.log('removeCategoryFromTask', {
  //     idTask,
  //     idCategory,
  //   });
  //   this.http
  //     .delete(`${backendUrl}:${port}/taskCategory/${idTask}/${idCategory}`)
  //     .subscribe(() => {
  //       // console.log('taskService.getTasks(idWorkspace)', idWorkspace);
  //       // this.categoryService.getWorkspaceCategories(idWorkspace);
  //       // this.taskService.getTasks(idWorkspace);
  //     });
  // }
}
