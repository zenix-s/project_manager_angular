import { Component, Input, inject } from '@angular/core';
import { Toaster, ToasterService } from "@app/service/toaster.service"

@Component({
  selector: 'app-toaster-item',
  templateUrl: './toaster-item.component.html',
  styles: ``,
  host: {
    class: 'flex w-full',
  }
})
export class ToasterItemComponent {
  ToasterService = inject(ToasterService)

  @Input()
  toast!: Toaster;
}
