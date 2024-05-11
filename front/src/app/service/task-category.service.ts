import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { backendUrl, port } from '@env';
import { TasksService } from './workspace-tasks.service';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TaskCategoryService {
  constructor() {}

  http = inject(HttpClient);
  taskService = inject(TasksService);
  categoryService = inject(CategoryService);
  AuthenticationService = inject(AuthenticationService);

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
      .post(
        `${backendUrl}:${port}/taskCategory`,
        {
          idTask,
          idCategory,
        },
        {
          headers: {
            Authorization: `${this.AuthenticationService.userToken}`,
          },
        }
      )
      // .subscribe(() => {
      //   this.taskService.getTasks(idWorkspace);
      //   this.categoryService.getWorkspaceCategories(idWorkspace);
      // });
      .subscribe({
        next: () => {
          this.taskService.getTasks(idWorkspace);
          this.categoryService.getWorkspaceCategories(idWorkspace);
        },
        error: (error) => {
          alert(error.error.message);
        },
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
        `${backendUrl}:${port}/taskCategory/${idTask}/${idCategory}`,
        {
          headers: {
            Authorization: `${this.AuthenticationService.userToken}`,
          },
        }
      )
      // .subscribe((idTask) => {
      //   this.taskService.getTasks(idWorkspace);
      //   this.categoryService.getWorkspaceCategories(idWorkspace);
      // });
      .subscribe({
        next: () => {
          this.taskService.getTasks(idWorkspace);
          this.categoryService.getWorkspaceCategories(idWorkspace);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }
}
