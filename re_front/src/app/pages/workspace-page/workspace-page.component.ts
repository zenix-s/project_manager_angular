import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SectionComponent } from '@app/shared/components/section/section.component';

@Component({
  selector: 'app-workspace-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SectionComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.css'
})
export class WorkspacePageComponent {

}
