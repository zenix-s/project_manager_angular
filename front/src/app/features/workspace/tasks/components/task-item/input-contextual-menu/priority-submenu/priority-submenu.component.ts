import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output()
  onChangePriority = new EventEmitter<priority>()

  changePriority(newPriority:priority){
    this.onChangePriority.emit(newPriority)
  }

  get listPriority() {
    return listPriority;
  }
}
