import { Injectable, inject, signal } from '@angular/core';
import { Task, TaskData } from '@types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { port, backendUrl } from '@env';

// @Injectable({
//   providedIn: "root",
// })
// export class TasksService {
//   constructor(private http: HttpClient) {}

//   getTasks(idWorkspace: number): Observable<TaskData[]> {
//     idWorkspace = parseInt(idWorkspace.toString());
//     return this.http.get<TaskData[]>(
//       `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
//     );
//   }

//   addTask(idWorkspace: number, task: Task): Observable<TaskData> {
//     return this.http.post<TaskData>(
//       `${backendUrl}:${port}/workspace/${idWorkspace}/task`,
//       task,
//     );
//   }

//   deleteTask(taskId: number): Observable<number> {
//     return this.http.delete<number>(`${backendUrl}:${port}/task/${taskId}`);
//   }

//   changeTask(task: Task): Observable<TaskData> {
//     console.log("change task ");
//     return this.http.put<TaskData>(
//       `${backendUrl}:${port}/task/${task.id}`,
//       task,
//     );
//   }
// }
// interface filter {
//   search: string;
//   category: string;
//   priority: string;
//   status: boolean;
// }
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  http = inject(HttpClient);

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
        console.log('tasks', tasks);
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
          this._tasks.value.filter((task) => task.id !== idTaskDeleted)
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
            if (t.id === updatedTask.id) {
              return updatedTask;
            }
            return t;
          })
        );
      });
  }
}
