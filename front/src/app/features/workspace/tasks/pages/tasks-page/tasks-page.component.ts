import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '@service/workspace-tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Task } from '@types';

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

  tasks: Task[] = [];

  @Input()
  idWorkspace: number = 0;

  DeleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe((data) => {
      console.log(data);
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    });
  }

  CreateTask() {
    console.log('create task');
  }

  EditTask(taskId: number) {
    console.log('edit task ', taskId);
  }

  ngOnInit(): void {
    this.tasksService.getTasks(this.idWorkspace).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
