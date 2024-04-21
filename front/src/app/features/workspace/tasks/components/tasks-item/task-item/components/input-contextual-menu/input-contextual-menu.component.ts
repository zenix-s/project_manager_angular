import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TaskData, TaskWCategories, priority } from '@app/interfaces/interfaces';

@Component({
  selector: 'app-input-contextual-menu',
  templateUrl: './input-contextual-menu.component.html',
  styles: ``,
})
export class InputContextualMenuComponent {
  opened: boolean = false;

  @Input()
  task!: TaskWCategories;

  @Output()
  onChangePriority = new EventEmitter<priority>()

  @Output()
  onChangeCompleted = new EventEmitter<boolean>()

  @Output()
  onDelete = new EventEmitter<void>()

  changePriority(newPriority:priority){
    this.onChangePriority.emit(newPriority)
  }

  changeCompleted(newCompleted:boolean){
    this.onChangeCompleted.emit(newCompleted)
  }

  delete(){
    this.onDelete.emit()
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
