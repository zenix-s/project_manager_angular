import { Component } from '@angular/core';
import { SectionComponent } from '@app/shared/components/section/section.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [SectionComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

}
