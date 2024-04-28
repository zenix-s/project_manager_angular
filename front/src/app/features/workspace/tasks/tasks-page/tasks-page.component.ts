import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@service/workspace-tasks.service';
import { CategoryService } from '@service/category.service';
import { Category, Task, TaskData } from '@types';

// @Component({
//   selector: 'app-tasks-page',
//   templateUrl: './tasks-page.component.html',
// })
// export class TasksPageComponent implements OnInit {
//   tasksService = inject(TasksService);
//   categoryService = inject(CategoryService);
//   // constructor(private tasksService: TasksService) {}

//   tasks = signal<TaskData[]>([]);
//   categories = signal<Category[]>([]);

//   @Input()
//   idWorkspace: number = 0;

//   DeleteTask(taskId: number) {
//     this.tasksService.deleteTask(taskId).subscribe((idTaskDeleted) => {
//       this.tasks.update((tasks) =>
//         tasks
//           .filter((task) => task.id !== idTaskDeleted)
//           .map((task) => {
//             return {
//               ...task,
//               subtasks: task.subtasks.filter(
//                 (subtask) => subtask.id !== idTaskDeleted
//               ),
//             };
//           })
//       );
//     });
//   }

//   CreateTask(task: Task) {
//     this.tasksService
//       .addTask(this.idWorkspace, task)
//       .subscribe((task: TaskData) => {
//         this.tasks.update((tasks) => [...tasks, task]);
//       });
//   }

//   EditTask(taskId: number) {
//     console.log('edit task ', taskId);
//   }

//   ChangeTask(task: Task) {
//     this.tasksService
//       .changeTask(task)
//       .subscribe((updatedTask: TaskData) => {
//         console.log("updated", updatedTask);
//         this.tasks.update((tasks) =>
//           tasks.map((t) => {
//             if (t.id === updatedTask.id) {
//               return updatedTask;
//             }
//             return t;
//           })
//         );
//         // if (task.dependentIdTask !== null) {
//         //   updatedTask.subtasks.map((subtask) => {
//         //     if (subtask.id === task.id) {
//         //       subtask.completed = task.completed;
//         //     }
//         //     return subtask;
//         //   });
//         // }else{
//         //   updatedTask.completed = task.completed;
//         // }

//         // this.tasks.update((tasks) =>
//         //   tasks.map((t) => {
//         //     if (t.id === updatedTask.id) {
//         //       return updatedTask;
//         //     }
//         //     return t;
//         //   })
//         // );
//       });
//   }

//   ngOnInit(): void {
//     this.tasksService
//       .getTasks(this.idWorkspace)
//       .subscribe((tasks) => {
//         console.log(tasks);
//         this.tasks.set(tasks);
//       });
//     this.categoryService
//       .getWorkspaceCategories(this.idWorkspace)
//       .subscribe((categories) => {
//         console.log(categories);
//         this.categories.set(categories);
//       });
//   }
// }

interface filter {
  search: string;
  category: string;
  priority: string;
  status: boolean;
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasksService = inject(TasksService);
  categoryService = inject(CategoryService);

  tasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  filters: WritableSignal<filter> = signal<filter>({
    search: '',
    category: '',
    priority: '',
    status: false,
  });

  // tasks: TaskData[] = [];

  DeleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }

  CreateTask(task: Task) {
    this.tasksService.addTask(this.idWorkspace, task);
  }

  EditTask(taskId: number) {
    console.log('edit task ', taskId);
  }

  ChangeTask(task: Task) {
    this.tasksService.changeTask(task);
  }

  @Input()
  idWorkspace: number = 0;

  constructor() {
    effect(() => {
      // any filter change filter tasks
      // this.tasks.update(
      //   // this._tasks().filter((task) => {
      //   //   const { search, category, priority, status } = this.filters();
      //   //   return (
      //   //     task.completed === status
      //   //   );
      //   // })
      //   this._tasks()
      // )
    });
  }

  ngOnInit(): void {
    this.tasksService.tasks$.subscribe((tasks) => {
      this.tasks.set(tasks);
    });
    this.categoryService.categories$.subscribe((categories) => {
      this.categories.set(categories);
    });

    this.categoryService.getWorkspaceCategories(this.idWorkspace);
    this.tasksService.getTasks(this.idWorkspace);
  }

  ngOnDestroy(): void {
    this.tasksService.cleanTasks();
    this.categoryService.cleanCategories();
  }
}
