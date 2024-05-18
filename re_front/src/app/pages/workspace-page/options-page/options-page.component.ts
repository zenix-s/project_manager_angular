import { Component } from '@angular/core';
import { SectionComponent } from '@app/shared/components/section/section.component';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [SectionComponent],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.css'
})
export class OptionsPageComponent {

}
