import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, WritableSignal, signal } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [SectionComponent, ButtonComponent ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {


  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement> | undefined;

  @Input() title: string = '';

  @Input()
  set isOpen(isOpen: boolean) {
    if (this.dialog) {
      if (isOpen) {
        this.dialog.nativeElement.showModal();
      } else {
        this.dialog.nativeElement.close();
      }
    }
  }

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

}
