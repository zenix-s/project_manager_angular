import { Component } from '@angular/core';
import { SectionComponent } from '@app/shared/components/section/section.component';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [SectionComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {

}
