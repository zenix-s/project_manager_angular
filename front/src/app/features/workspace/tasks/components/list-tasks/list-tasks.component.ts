import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '@app/service/workspace-tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@types';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
})
export class ListTasksComponent{
  @Input()
  tasks: Task[] = [];
  // @Input()
  // workspaceId!: number;
}
