import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionComponent } from '../section/section.component';
import { ButtonComponent } from '../button/button.component';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { DropdownComponent } from '../dropdown/dropdown/dropdown.component';
import { DropdownListComponent } from '../dropdown/dropdown-list/dropdown-list.component';
import { DropdownItemComponent } from '../dropdown/dropdown-item/dropdown-item.component';
import { UserWorkspacesService } from '../../../core/services/user-workspaces.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionComponent, ButtonComponent, DropdownComponent, DropdownListComponent, DropdownItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  authenticationService = inject(AuthenticationService)

  userWorkspacesService = inject(UserWorkspacesService)

}
