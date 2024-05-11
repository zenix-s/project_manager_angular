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
  search: string | null;
  category: number[];
  priority: string | null;
  status: boolean;
  subtaskFilter: boolean;
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  host: { class: 'flex flex-col grow' },
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasksService = inject(TasksService);
  categoryService = inject(CategoryService);

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

  EditTask(taskId: number) {}

  ChangeTask(task: Task) {
    this.tasksService.changeTask(task);
  }

  clearFilters() {
    this.filters.set({
      search: '',
      category: [],
      priority: null,
      status: true,
      subtaskFilter: false,
    });
    this.filteredTasks.set(this.applyFilter(this.tasks()));
  }

  filterCompleted() {
    this.filters.set({
      ...this.filters(),
      status: !this.filters().status,
    });
    this.filteredTasks.set(this.applyFilter(this.tasks()));
  }

  filterSubtasks() {
    this.filters.set({
      ...this.filters(),
      subtaskFilter: !this.filters().subtaskFilter,
    });
    console.log(this.tasks());
    this.filteredTasks.set(this.applyFilter(this.tasks()));
  }

  filterBug() {
    this.filters.set({
      ...this.filters(),
      // category: this.filters().category.length > 0 ? [] : [1],
      category: this.filters().category.includes(1)
        ? this.filters().category.filter((c) => c !== 1)
        : [...this.filters().category, 1],
    });
    this.filteredTasks.set(this.applyFilter(this.tasks()));
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
