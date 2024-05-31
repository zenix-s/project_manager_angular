import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, ElementRef, inject } from '@angular/core';
import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  elementRef = inject(ElementRef);
  @Input()
  action: 'hover' | 'click' = 'hover';

  // will expand to left or right side of the button and on the side or bottom of the button

  @Input()
  direction: 'left' | 'right' | 'bottom-left' | 'bottom-right' = 'bottom-right';

  isOpen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement: any = this.elementRef.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
}
