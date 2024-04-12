import { Component, Input } from '@angular/core';
import { Task } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-tasks-item',
  template: `
    <div>
      {{ task.id }} - {{ task.name }} - {{ task.deadline | date : 'yyyy-MM-dd' }} - {{ task.completed }}
    </div>
  `,
  styles: ``,
})
export class TasksItemComponent {
  @Input()
  task!: Task;
}
