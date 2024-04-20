import { Component } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { listPriority, priority } from '@app/interfaces/interfaces';

6
@Component({
  selector: 'app-input-select-priority',
  templateUrl: './input-select-priority.component.html',
})
export class InputSelectPriorityComponent implements ControlValueAccessor {
  // listPriority: priority[] = ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  isPriority = (value: any): value is priority => listPriority.includes(value);

  get listPriority() {
    return listPriority;
  }

  value: priority;
  disabled: boolean;
  onChange: any = () => {};
  onTouch: any = () => {};

  displayed: boolean = false;

  constructor(private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.value = 'NONE';
    this.disabled = false;
  }

  select(value: priority) {
    if (this.disabled) return;
    if (!this.isPriority(value)) return;
    this.value = value;
    console.log(this.value);
    this.displayed = false;
    this.onChange(this.value);
    this.onTouch();
  }

  writeValue(obj: any): void {
    if (!this.isPriority(obj)) return;
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
