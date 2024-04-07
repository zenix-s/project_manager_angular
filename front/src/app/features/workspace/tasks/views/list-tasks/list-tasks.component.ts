import { Component } from '@angular/core';
import { TasksService } from '@features/workspace/tasks/service/tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
})
export class ListTasksComponent {
  constructor(
    private tasksService: TasksService,
  ) {}

  get tasks() {
    return this.tasksService.getTasks();
  }
}
