import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  // templateUrl: './tooltip.component.html',
  template: `
    <div
      class="relative"
      (mouseenter)="hover = true"
      (mouseleave)="hover = false"
    >
      @if (hover) {
      <span
        class="absolute z-10 p-2 text-xs text-white bg-black rounded-lg select-none w-max"
        [ngStyle]="{ top: '-160%', left: '50%', transform: 'translateX(-50%)' }"
        (mouseenter)="hover = false"
      >
        {{ text }}
      </span>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: '',
})
export class TooltipComponent {
  @Input() text = '';

  hover = false;
}
