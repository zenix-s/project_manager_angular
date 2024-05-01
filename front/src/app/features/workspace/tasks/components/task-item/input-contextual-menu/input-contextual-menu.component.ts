import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Category, Task, TaskData, priority } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-input-contextual-menu',
  templateUrl: './input-contextual-menu.component.html',
  styles: ``,
})
export class InputContextualMenuComponent {
  opened: boolean = false;

  @Input()
  task!: TaskData;
  @Input()
  categories: Category[] = []

  @Output()
  onChangePriority = new EventEmitter<priority>()

  @Output()
  onChangeCompleted = new EventEmitter<boolean>()

  @Output()
  onDeadlineChange = new EventEmitter<Date | null>()

  @Output()
  onDelete = new EventEmitter<void>()

  changePriority(newPriority:priority){
    this.onChangePriority.emit(newPriority)
  }

  changeCompleted(newCompleted:boolean){
    this.onChangeCompleted.emit(newCompleted)
  }

  changeDeadline(newDeadline:Date | null){
    console.log("new deadline: low", newDeadline)
    this.onDeadlineChange.emit(newDeadline)
  }

  delete(){
    this.onDelete.emit()
    this.opened = false
  }



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
