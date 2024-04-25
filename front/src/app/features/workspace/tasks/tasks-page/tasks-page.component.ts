import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@service/workspace-tasks.service';
import { CategoryService } from '@service/category.service';
import { Category, Task, TaskData } from '@types';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit {
  tasksService = inject(TasksService);
  categoryService = inject(CategoryService);
  // constructor(private tasksService: TasksService) {}

  tasks = signal<TaskData[]>([]);
  categories = signal<Category[]>([]);

  @Input()
  idWorkspace: number = 0;

  DeleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe((idTaskDeleted) => {
      this.tasks.update((tasks) =>
        tasks
          .filter((task) => task.id !== idTaskDeleted)
          .map((task) => {
            return {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.id !== idTaskDeleted
              ),
            };
          })
      );
    });
  }

  CreateTask(task: Task) {
    this.tasksService
      .addTask(this.idWorkspace, task)
      .subscribe((task: TaskData) => {
        this.tasks.update((tasks) => [...tasks, task]);
      });
  }

  EditTask(taskId: number) {
    console.log('edit task ', taskId);
  }

  ChangeTask(task: Task) {
    this.tasksService
      .changeTask(task)
      .subscribe((updatedTask: TaskData) => {
        // this.tasks.update((tasks) =>
        //   tasks.map((t) => {
        //     if (t.id === updatedTask.id) {
        //       return updatedTask;
        //     }
        //     return t;
        //   })
        // );
        console.log("updatedTask", updatedTask);
      });
  }

  ngOnInit(): void {
    this.tasksService
      .getTasks(this.idWorkspace)
      .subscribe((tasks) => {
        console.log(tasks);
        this.tasks.set(tasks);
      });
    this.categoryService
      .getWorkspaceCategories(this.idWorkspace)
      .subscribe((categories) => {
        console.log(categories);
        this.categories.set(categories);
      });
  }
}
