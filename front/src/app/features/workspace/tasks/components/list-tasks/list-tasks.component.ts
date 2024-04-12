import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  onDeleteTask = new EventEmitter<number>();

  @Output()
  onEditTask = new EventEmitter<number>();

  DeleteTask(taskId: number) {
    this.onDeleteTask.emit(taskId);
  }

  EditTask(taskId: number) {
    this.onEditTask.emit(taskId);
  }
  // @Input()
  // workspaceId!: number;
}
