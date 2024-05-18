import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WorkspaceCategoriesService } from './workspace-categories.service';
import { WorkspaceTasksService } from './workspace-tasks.service';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { backendUrl, port } from '@env/back.env';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceTaskCategoriesService {
  http = inject(HttpClient);
  workspaceTaskService = inject(WorkspaceTasksService);
  workspaceCategoriesService = inject(WorkspaceCategoriesService);
  authenticationService = inject(AuthenticationService);
  toasterService = inject(ToasterService);

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
            Authorization: `${this.authenticationService.userToken}`,
          },
        }
      )
      .subscribe({
        next: () => {
          this.workspaceTaskService.getTasks(idWorkspace);
          this.workspaceCategoriesService.getWorkspaceCategories(idWorkspace);
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
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
            Authorization: `${this.authenticationService.userToken}`,
          },
        }
      )
      .subscribe({
        next: () => {
          this.workspaceTaskService.getTasks(idWorkspace);
          this.workspaceCategoriesService.getWorkspaceCategories(idWorkspace);
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }
}
