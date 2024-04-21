import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-completed-submenu',
  templateUrl: './completed-submenu.component.html',
  styles: `:host {width: 100%;}`
})
export class CompletedSubmenuComponent {
  hovered:boolean = false;

  @Input()
  taskCompleted!: boolean;

  @Output()
  onChangeCompleted = new EventEmitter<boolean>()

  toggleCompleted(){
    this.onChangeCompleted.emit(!this.taskCompleted)
  }
}
