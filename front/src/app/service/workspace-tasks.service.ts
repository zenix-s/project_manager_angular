import { Injectable, inject, signal } from '@angular/core';
import { Task, TaskData } from '@types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { port, backendUrl } from '@env';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);

  private _tasks = new BehaviorSubject<TaskData[]>([]);

  tasks$ = this._tasks.asObservable();

  // filters = signal<filter>({
  //   search: '',
  //   category: '',
  //   priority: '',
  //   status: false,
  // });

  cleanTasks() {
    this._tasks.next([]);
  }

  getTasks(idWorkspace: number) {
    idWorkspace = parseInt(idWorkspace.toString());

    this.http
      .get<TaskData[]>(`${backendUrl}:${port}/workspace/${idWorkspace}/task`)
      .subscribe((tasks) => {
        this._tasks.next(tasks);
        // console.log('tasks', tasks);
      });
  }

  addTask(idWorkspace: number, task: Task) {
    this.http
      .post<TaskData>(
        `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
        task
      )
      .subscribe((task: TaskData) => {
        this._tasks.next([...this._tasks.value, task]);
      });
  }

  deleteTask(taskId: number) {
    this.http
      .delete<number>(`${backendUrl}:${port}/task/${taskId}`)
      .subscribe((idTaskDeleted) => {
        this._tasks.next(
          // this._tasks.value.filter((task) => task.id !== idTaskDeleted)
          this._tasks.value.filter((task) => task.task.id !== idTaskDeleted)
        );
      });
  }

  changeTask(task: Task) {
    console.log('change task ', task);
    this.http
      .put<TaskData>(`${backendUrl}:${port}/task/${task.id}`, task)
      .subscribe((updatedTask: TaskData) => {
        this._tasks.next(
          this._tasks.value.map((t) => {
            if (t.task.id === updatedTask.task.id) {
              return updatedTask;
            }
            return t;
          })
        );
      });
  }
}
