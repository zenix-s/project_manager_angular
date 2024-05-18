import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  // templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  template: `
    <div>
      <div class="flex flex-col">
        <label for="{{ name }}" class="ml-2">
          {{ label }}
        </label>
        <input
          class="border border-white p-2 outline-none rounded-md bg-transparent focus:border-white placeholder-shown:text-white/40"
          placeholder=" "
          type="{{ type }}"
          name="{{ name }}"
          (input)="onInput($event)"
          [value]="value"
        />
      </div>
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  NgControl = inject(NgControl);
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.NgControl.valueAccessor = this;
  }

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};
  disabled = false;

  setValue(value: string) {
    this.value = value;
  }

  writeValue(obj: any): void {
    this.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: any): void {
    this.setValue(event.target.value);
    this.onChange(this.value);
  }
}
