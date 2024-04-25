import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { listPriority, priority } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-select-priority',
  templateUrl: './select-priority.component.html',
  // styles: ":host { width: 200px; display: block; }",
})
export class SelectPriorityComponent {
  @Input()
  priority!: priority;

  // @ViewChild('details') details: ElementRef<HTMLDetailsElement>;
  @Output()
  onPriorityChange = new EventEmitter<priority>();

  constructor(
    private elementRef: ElementRef<HTMLDetailsElement>,
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement: any = this.elementRef.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  isOpen: boolean = false;

  get listPriority() {
    return listPriority;
  }

  select(value: priority) {
    this.priority = value;
    this.isOpen = false;
    this.onPriorityChange.emit(value);
  }
}
