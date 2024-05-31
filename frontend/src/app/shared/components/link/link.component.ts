import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {

  @Input() disabled: boolean = false;
  @Input() theme: 'primary' | 'success' | 'warning' | 'error' = 'primary';
  @Input() outline: boolean = false;
  @Input() rounded: boolean = false;
  @Input() href: string = '';
}
