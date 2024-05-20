import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { Task, TaskData } from '@env/interface.env';
import { BehaviorSubject } from 'rxjs';
import { backendUrl, port } from '@env/back.env';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceTasksService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private toasterService = inject(ToasterService);

  private _tasks = new BehaviorSubject<TaskData[]>([]);

  tasks$ = this._tasks.asObservable();

  clearTasks() {
    this._tasks.next([]);
  }

  getTasks(idWorkspace: number) {
    idWorkspace = parseInt(idWorkspace.toString());

    this.http
      .get(`${backendUrl}:${port}/workspace/${idWorkspace}/task`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (tasks) => {
          this._tasks.next(tasks as TaskData[]);
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  createTask(idWorkspace: number, task: Task) {
    idWorkspace = parseInt(idWorkspace.toString());

    this.http
      .post<TaskData>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
        task,
        {
          headers: {
            Authorization: `${this.authenticationService.userToken}`,
          },
        }
      )
      .subscribe({
        next: (task) => {
          this._tasks.next([...this._tasks.value, task]);
          this.toasterService.success('Task created successfully');
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  deleteTask(idTask: number) {
    this.http
      .delete<TaskData>(`${backendUrl}:${port}/task/${idTask}`, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (task) => {
          this._tasks.next(
            this._tasks.value.filter((t) => t.task.id !== idTask)
          );
          this.toasterService.success('Task deleted successfully');
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  updateTask(idTask: number, task: Task) {
    this.http
      .put<TaskData>(`${backendUrl}:${port}/task/${idTask}`, task, {
        headers: {
          Authorization: `${this.authenticationService.userToken}`,
        },
      })
      .subscribe({
        next: (task) => {
          this._tasks.next(
            this._tasks.value.map((t) => {
              if (t.task.id === task.task.id) {
                return task;
              }
              return t;
            })
          );
          this.toasterService.success('Task updated successfully');
        },
        error: (error) => {
          this.toasterService.error(error.error.message);
        },
      });
  }

  getTasksSnapshot() {
    return this._tasks.getValue();
  }
}
