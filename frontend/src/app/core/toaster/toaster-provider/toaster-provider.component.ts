import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { ToasterService } from '../service/toaster.service';
import { Toaster } from '../toaster.entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster-provider',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toaster-provider.component.html',
  styleUrl: './toaster-provider.component.css',
})
export class ToasterProviderComponent implements OnInit, OnDestroy {
  toasterService = inject(ToasterService);

  toasts: WritableSignal<Toaster[]> = signal<Toaster[]>([]);
  toastSubscription!: Subscription;

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
