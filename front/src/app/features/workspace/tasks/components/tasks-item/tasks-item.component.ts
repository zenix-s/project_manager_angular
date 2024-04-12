import { Component, Input } from '@angular/core';
import { Task } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styles: ``,
})
export class TasksItemComponent {
  @Input()
  task!: Task;
}
