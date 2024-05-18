import { Component } from '@angular/core';
import { SectionComponent } from '@app/shared/components/section/section.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [SectionComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export class TasksPageComponent {

}
