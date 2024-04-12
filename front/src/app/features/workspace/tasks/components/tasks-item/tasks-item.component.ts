import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styles: ``,
})
export class TasksItemComponent {
  @Input()
  task!: Task;

  @Output()
  onDeleteTask = new EventEmitter<number>();

  @Output()
  onEditTask = new EventEmitter<number>();

  onDelete() {
    this.onDeleteTask.emit(this.task.id);
  }

  onEdit() {
    this.onEditTask.emit(this.task.id);
  }
}
