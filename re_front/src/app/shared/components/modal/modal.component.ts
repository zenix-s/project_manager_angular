import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [SectionComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements AfterViewInit, OnDestroy {
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

  private closeHandler = () => {
    this.onClose.emit();
  };

  ngAfterViewInit(): void {
    if (this.dialog) {
      this.dialog.nativeElement.addEventListener('close', this.closeHandler);
    }
  }

  ngOnDestroy(): void {
    if (this.dialog) {
      this.dialog.nativeElement.removeEventListener('close', this.closeHandler);
    }
  }
}
