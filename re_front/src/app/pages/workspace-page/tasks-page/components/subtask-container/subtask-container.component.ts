import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtask-container',
  standalone: true,
  imports: [],
  templateUrl: './subtask-container.component.html',
  styleUrl: './subtask-container.component.css'
})
export class SubtaskContainerComponent {
  @Input()
  isLast: boolean = false;
}
