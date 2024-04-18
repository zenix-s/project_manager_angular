import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@service/workspace-tasks.service';
import { Task, TaskData } from '@types';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit {
  constructor(
    private tasksService: TasksService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  tasks = signal<TaskData[]>([]);

  @Input()
  idWorkspace: number = 0;

  DeleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe((idTaskDeleted) => {
      this.tasks.update((tasks) => {
        const newTasks = tasks
          .filter((task) => task.id !== idTaskDeleted)
          .map((task) => {
            return {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.id !== idTaskDeleted
              ),
            };
          });
        return newTasks;
      });
    });
  }

  CreateTask(task: Task) {
    this.tasksService
      .addTask(this.idWorkspace, task)
      .subscribe((task: TaskData) => {
        console.log(task);
        this.tasks.set([...this.tasks(), task]);
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
