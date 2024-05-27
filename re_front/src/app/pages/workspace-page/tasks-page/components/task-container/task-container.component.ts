import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.css'
})
export class TaskContainerComponent {

  @Input()
  haveSubtasks: boolean = false;

  isOpened: boolean = true;
}
