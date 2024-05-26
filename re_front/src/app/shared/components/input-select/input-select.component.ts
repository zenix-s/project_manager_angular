import {
  Component,
  ElementRef,
  HostListener,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.css',
})
export class InputSelectComponent implements ControlValueAccessor {
  ngControl = inject(NgControl);
  private elementRef = inject(ElementRef);

  @Input()
  label: string = '';
  @Input()
  options: any[] = [];

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  selectedOption: WritableSignal<any> = signal(null);

  onChange: any = () => {};
  onTouch: any = () => {};
  disabled: boolean = false;

  isOptionsVisible: boolean = false;

  toggleOptionsVisibility() {
    this.isOptionsVisible = !this.isOptionsVisible;
  }

  selectOption(option: { value: any; label: string } | null) {
    if (!option?.value) {
      this.selectedOption.set(null);
      this.onChange(null);
      this.isOptionsVisible = false;
      return;
    }
    this.onChange(option.value);
    this.selectedOption.set(option);
    this.isOptionsVisible = false;
  }

  writeValue(obj: any): void {
    this.selectOption({
      value: obj,
      label: this.options.find((option) => option.value === obj)?.label,
    });
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement = this.elementRef.nativeElement;
    const clickedInside = nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOptionsVisible = false;
    }
  }
}
