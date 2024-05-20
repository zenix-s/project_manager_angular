import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SectionComponent } from '../section/section.component';
import { ButtonComponent } from '../button/button.component';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { DropdownComponent } from '../dropdown/dropdown/dropdown.component';
import { DropdownListComponent } from '../dropdown/dropdown-list/dropdown-list.component';
import { DropdownItemComponent } from '../dropdown/dropdown-item/dropdown-item.component';
import { UserWorkspacesService } from '../../../core/services/user-workspaces.service';
import { Workspace } from '@env/interface.env';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionComponent, ButtonComponent, DropdownComponent, DropdownListComponent, DropdownItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  authenticationService = inject(AuthenticationService)
  userWorkspacesService = inject(UserWorkspacesService)
  router = inject(Router)

  workspaces:WritableSignal<Workspace[]> = signal<Workspace[]>([])
  workspaceSub!:Subscription

  ngOnInit(): void {
    this.workspaceSub = this.userWorkspacesService.workspaces$.subscribe((workspaces) => {
      this.workspaces.set(workspaces);
    });

    this.userWorkspacesService.getWorkspaces();
  }
}
