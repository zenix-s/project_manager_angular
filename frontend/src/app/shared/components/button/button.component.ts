import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() theme: 'primary' | 'success' | 'warning' | 'error' = 'primary';
  @Input() outline: boolean = false;
  @Input() rounded: boolean = false;

  @Output() onClick = new EventEmitter<void>();

}
