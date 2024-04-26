import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtask-item',
  templateUrl: './subtask-item.component.html',
  styles: ``
})
export class SubtaskItemComponent {

  @Input()
  isLast: boolean = false;
}
