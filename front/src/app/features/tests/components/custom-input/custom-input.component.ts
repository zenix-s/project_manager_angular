import { Component } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent implements ControlValueAccessor {
  enabled: boolean;

  onChanged: any = () => {};
  onTouched: any = () => {};
  disabled: boolean;

  constructor(private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;

    this.enabled = false;
    this.disabled = false;
  }



  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {

    if (this.disabled) {
      return;
    }

    this.enabled = !this.enabled;

    this.onChanged(this.enabled);
    this.onTouched();

  }

  writeValue(obj: any): void {
    this.enabled = obj;
  }
}
