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
import { Subscription } from 'rxjs';


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

  taskSubscription!: Subscription;
  categorySubscription!: Subscription;


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
    this.taskSubscription = this.tasksService.tasks$.subscribe((tasks) => {
      this.tasks.set(tasks);
      console.log('tasks', tasks);
    });
    this.categorySubscription = this.categoryService.categories$.subscribe((categories) => {
      this.categories.set(categories);
    });

    this.categoryService.getWorkspaceCategories(this.idWorkspace);
    this.tasksService.getTasks(this.idWorkspace);
  }

  ngOnDestroy(): void {
    this.tasksService.cleanTasks();
    this.categoryService.cleanCategories();

    this.taskSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}
