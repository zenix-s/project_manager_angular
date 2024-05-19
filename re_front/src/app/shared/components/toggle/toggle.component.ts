import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {

  private _checked = false;

  @Input()
  set checked(value: boolean) {
    this._checked = value;
  }

  get checked() {
    return this._checked;
  }

  @Output()
  checkedChange = new EventEmitter<boolean>();

  toggle() {
    this._checked = !this._checked;
    this.checkedChange.emit(this._checked);
  }
}
