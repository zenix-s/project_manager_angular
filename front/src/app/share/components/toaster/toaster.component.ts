import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ToasterService, Toaster } from '@app/service/toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styles: ``,
  host: {
    class: 'absolute top-0 right-0 w-full z-50 flex max-w-96',
  },
})
export class ToasterComponent implements OnInit, OnDestroy {
  toasterService = inject(ToasterService);

  toasts: WritableSignal<Toaster[]> = signal<Toaster[]>([]);
  toastSubscription!: Subscription;

  testToasts() {
    this.toasterService.addToast('test','Test success toast', 'success');
  }


  ngOnInit(): void {
    this.toastSubscription = this.toasterService.toaster$.subscribe(
      (toasts) => {
        this.toasts.set(toasts);
      }
    );
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
