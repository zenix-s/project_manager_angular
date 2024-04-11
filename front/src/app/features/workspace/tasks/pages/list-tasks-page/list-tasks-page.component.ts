import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '@service/workspace-tasks.service';
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

  @Input()
  idWorkspace: number = 0;

  ngOnInit(): void {
    this.tasksService.getTasks(this.idWorkspace).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
