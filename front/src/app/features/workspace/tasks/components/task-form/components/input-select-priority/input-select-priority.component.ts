import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { listPriority, priority } from '@app/interfaces/interfaces';

6;
@Component({
  selector: 'app-input-select-priority',
  templateUrl: './input-select-priority.component.html',
})
export class InputSelectPriorityComponent implements ControlValueAccessor {
  ngControl = inject(NgControl);
  elementRef = inject(ElementRef);
  isPriority = (value: any): value is priority => listPriority.includes(value);

  get listPriority() {
    return listPriority;
  }

  value: priority;
  disabled: boolean;
  onChange: any = () => {};
  onTouch: any = () => {};

  displayed: boolean = false;

  constructor() {
    this.ngControl.valueAccessor = this;
    this.value = 'NONE';
    this.disabled = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement: any = this.elementRef.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    if (!clickedInside) {
      this.displayed = false;
    }
  }

  select(value: priority) {
    if (this.disabled) return;
    if (!this.isPriority(value)) return;
    this.value = value;
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
