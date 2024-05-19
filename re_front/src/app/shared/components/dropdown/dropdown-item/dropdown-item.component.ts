import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.css'
})
export class DropdownItemComponent {
  @Output()
  onClick = new EventEmitter<void>();
  @Input()
  isSelected = false;
}
