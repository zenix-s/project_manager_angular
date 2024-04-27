import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styles: ''
})
export class TooltipComponent {
  @Input() text = '';

  hover = false;
}
