import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@service/workspace-tasks.service';
import { Task, TaskData } from '@types';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  tasks = signal<TaskData[]>([]);

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
        this.tasks.update((tasks) => {
          return [...tasks, task];
        });
      });
  }

  EditTask(taskId: number) {
    console.log('edit task ', taskId);
  }

  ngOnInit(): void {
    this.tasksService.getTasks(this.idWorkspace).subscribe((tasks) => {
      console.log(tasks);
      this.tasks.set(tasks);
    });
  }
}
