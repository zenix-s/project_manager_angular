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
import { TaskFilterService, filter } from '@app/features/workspace/tasks/services/task-filter.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  host: { class: 'flex flex-col grow' },
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasksService = inject(TasksService);
  categoryService = inject(CategoryService);
  filterService = inject(TaskFilterService);

  tasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  filteredTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  taskSubscription!: Subscription;
  categorySubscription!: Subscription;

  filters: WritableSignal<filter> = signal<filter>({
    search: '',
    category: [],
    priority: null,
    status: true,
    subtaskFilter: false,
  });

  // tasks: TaskData[] = [];

  DeleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }

  CreateTask(task: Task) {
    this.tasksService.addTask(this.idWorkspace, task);
  }


  ChangeTask(task: Task) {
    this.tasksService.changeTask(task);
  }

  @Input()
  idWorkspace: number = 0;

  constructor() {}

  applyFilter(tasks: TaskData[]): TaskData[] {
    const filteredTasks: TaskData[] = [];
    const { search, category, priority, status, subtaskFilter } =
      this.filters();

    tasks.forEach((task) => {
      const filteredTask: TaskData = { ...task };

      if (
        (status ? true : task.task.completed == false) &&
        (priority ? task.task.priority === priority : true) &&
        (category.length > 0
          ? task.categories.find((c) => category.includes(c.id))
          : true)
      ) {
        if (task.subtasks && task.subtasks.length > 0 && subtaskFilter) {
          filteredTask.subtasks = this.applyFilter(task.subtasks);
        }

        filteredTasks.push(filteredTask);
      }
    });

    return filteredTasks;
  }

  ngOnInit(): void {
    this.taskSubscription = this.tasksService.tasks$.subscribe((tasks) => {
      this.tasks.set(tasks);
      this.filteredTasks.set(this.applyFilter(this.tasks()));
    });
    this.categorySubscription = this.categoryService.categories$.subscribe(
      (categories) => {
        this.categories.set(categories);
      }
    );
    this.filterService.filters$.subscribe((filters) => {
      this.filters.set(filters);
      this.filteredTasks.set(this.applyFilter(this.tasks()));
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
