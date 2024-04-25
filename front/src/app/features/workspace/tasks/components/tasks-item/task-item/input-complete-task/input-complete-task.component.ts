import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-complete-task',
  templateUrl: './input-complete-task.component.html',
  styles: ``,
})
export class InputCompleteTaskComponent {
  private _completed: boolean = false;

  @Input()
  set completed(completed: boolean) {
    this._completed = completed;
  }

  get completed(): boolean {
    return this._completed;
  }

  @Output()
  onToggleChange = new EventEmitter<boolean>()

  toggle() {
    this._completed = !this._completed;
    this.onToggleChange.emit(this.completed)
  }

  constructor() {}
}
