import { Component, Input } from '@angular/core';
import { TaskData, listPriority, priority } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-priority-submenu',
  templateUrl: './priority-submenu.component.html',
  styles: ``
})
export class PrioritySubmenuComponent {
  hovered:boolean = false;

  @Input()
  taskPriority!: priority;

  get listPriority() {
    return listPriority;
  }
}
