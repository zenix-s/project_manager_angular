import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { backendUrl, port } from '@env';
import { TasksService } from './workspace-tasks.service';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskCategoryService {
  constructor() {}

  http = inject(HttpClient);
  taskService = inject(TasksService);
  categoryService = inject(CategoryService);

  addCategoryToTask(
    {
      idTask,
      idCategory,
    }: {
      idTask: number;
      idCategory: number;
    },
    idWorkspace: number
  ) {
    this.http
      .post(`${backendUrl}:${port}/taskCategory`, {
        idTask,
        idCategory,
      })
      .subscribe(() => {
        this.taskService.getTasks(idWorkspace);
        this.categoryService.getWorkspaceCategories(idWorkspace);
      });
  }

  removeCategoryFromTask(
    {
      idTask,
      idCategory,
    }: {
      idTask: number;
      idCategory: number;
    },
    idWorkspace: number
  ) {
    this.http
      .delete<number>(
        `${backendUrl}:${port}/taskCategory/${idTask}/${idCategory}`
      )
      .subscribe((idTask) => {
        this.taskService.getTasks(idWorkspace);
        this.categoryService.getWorkspaceCategories(idWorkspace);
      });
  }
}
