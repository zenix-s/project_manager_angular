import { Component, Input, inject } from '@angular/core';
import { ToasterService } from '../../service/toaster.service';
import { Toaster } from '../../toaster.entity';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  ToasterService = inject(ToasterService);

  @Input()
  toast!: Toaster;
}
