import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { TaskData, TaskWCategories } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-input-contextual-menu',
  templateUrl: './input-contextual-menu.component.html',
  styles: ``,
})
export class InputContextualMenuComponent {
  opened: boolean = false;

  @Input()
  task!: TaskWCategories;

  constructor(private elementRef: ElementRef<HTMLElement>) {}
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement: any = this.elementRef.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    if (!clickedInside) {
      this.opened = false;
    }
  }
}
