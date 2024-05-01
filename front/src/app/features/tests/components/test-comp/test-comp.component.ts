import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-comp',
  template: `
    <button (click)="open()">Open</button>
    <dialog #ref class="text-white h-60 w-60 bg-white">
      test-comp works!
    </dialog>
  `,
  styles: ``
})
export class TestCompComponent {
  @ViewChild('ref') ref: ElementRef<HTMLDialogElement> | undefined;

  open() {
    if (!this.ref) {
      return;
    }
    this.ref.nativeElement.showModal();
  }

  close() {
    if (!this.ref) {
      return;
    }
    this.ref.nativeElement.close();
  }

}

