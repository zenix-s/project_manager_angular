import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-task-submenu',
  templateUrl: './delete-task-submenu.component.html',
  styleUrl: './delete-task-submenu.component.css',
})
export class DeleteTaskSubmenuComponent {

  @Output()
  onDeleteTask = new EventEmitter<void>();

  delete() {
    this.onDeleteTask.emit();
  }
}
