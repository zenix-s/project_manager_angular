import { Component, OnInit } from '@angular/core';
import { TasksService } from '@features/workspace/tasks/service/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Task } from '@types';

@Component({
  selector: 'app-list-tasks-page',
  templateUrl: './list-tasks-page.component.html',
})
export class ListTasksPageComponent implements OnInit {
  constructor(
    private tasksService: TasksService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  tasks: Task[] = [];

  ngOnInit(): void {
    this.ActivatedRoute.params
      .pipe(
        switchMap(({ workspaceId }) => this.tasksService.getTasks(workspaceId))
      )
      .subscribe((tasksOrTask) => {
        if (Array.isArray(tasksOrTask)) {
          this.tasks = tasksOrTask;
        } else {
          this.tasks = [tasksOrTask];
        }
      });
  }

  // get tasks() {
  //   console.log(this.workspaceId);
  //   return this.tasksService.getTasks(this.workspaceId!);
  // }
}
