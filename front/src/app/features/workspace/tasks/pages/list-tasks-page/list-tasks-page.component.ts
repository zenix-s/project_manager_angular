import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    if (!this.ActivatedRoute.snapshot.paramMap.has('idWorkspace')) {
      this.router.navigate(['/']);
    }
    const idWorkspace = parseInt(
      this.ActivatedRoute.snapshot.paramMap.get('idWorkspace') as any
    );
    if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
      this.router.navigate(['/']);
    }

    this.tasksService.getTasks(idWorkspace).subscribe((tasks) => {
      this.tasks = tasks;
    });

    // this.idWorkspace = this.ActivatedRoute.snapshot.paramMap.get('idWorkspace') as any;
    // console.log(this.idWorkspace);
    // this.ActivatedRoute.params
    //   .pipe(
    //     switchMap(({ idWorkspace }) => this.tasksService.getTasks(idWorkspace))
    //   )
    //   .subscribe((tasksOrTask) => {
    //     if (Array.isArray(tasksOrTask)) {
    //       this.tasks = tasksOrTask;
    //     } else {
    //       this.tasks = [tasksOrTask];
    //     }
    //     console.table(this.tasks);
    //   });
  }

  // get tasks() {
  //   console.log(this.workspaceId);
  //   return this.tasksService.getTasks(this.workspaceId!);
  // }
}
