import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '@features/workspace/tasks/service/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@features/workspace/tasks/interfaces/task.interface';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
})
export class ListTasksComponent{
  @Input()
  tasks: Task[] = [];
  @Input()
  workspaceId!: number;
}