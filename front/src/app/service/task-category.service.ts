import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { backendUrl, port } from '@env';
import { TasksService } from './workspace-tasks.service';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class TaskCategoryService {
  constructor() {}

  http = inject(HttpClient);
  taskService = inject(TasksService);
  categoryService = inject(CategoryService);
  AuthenticationService = inject(AuthenticationService);
  ToasterService = inject(ToasterService);

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
      .subscribe({
        next: () => {
          this.taskService.getTasks(idWorkspace);
          this.categoryService.getWorkspaceCategories(idWorkspace);
          // this.ToasterService.addToast(
          //   'Añadir categoría',
          //   'Categoría añadida a la tarea',
          //   'success'
          // );
        },
        error: (error) => {
          // alert(error.error.message);
          this.ToasterService.addToast('Añadir categoría', error.error.message, 'error');
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
      .subscribe({
        next: () => {
          this.taskService.getTasks(idWorkspace);
          this.categoryService.getWorkspaceCategories(idWorkspace);
          // this.ToasterService.addToast(
          //   'Eliminar categoría',
          //   'Categoría eliminada de la tarea',
          //   'success'
          // );
        },
        error: (error) => {
          // alert(error.error.message);
          this.ToasterService.addToast('Eliminar categoría', error.error.message, 'error');
        },
      });
  }
}
