import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SectionComponent } from '../section/section.component';
import { ButtonComponent } from '../button/button.component';
import { AuthenticationService } from '@app/core/authentication/service/authentication.service';
import { DropdownComponent } from '../dropdown/dropdown/dropdown.component';
import { DropdownListComponent } from '../dropdown/dropdown-list/dropdown-list.component';
import { DropdownItemComponent } from '../dropdown/dropdown-item/dropdown-item.component';
import { UserWorkspacesService } from '@app/core/services/user-workspaces.service';
import { Workspace } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { LinkComponent } from '../link/link.component';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SectionComponent,
    ButtonComponent,
    DropdownComponent,
    DropdownListComponent,
    DropdownItemComponent,
    LinkComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  userWorkspacesService = inject(UserWorkspacesService);
  router = inject(Router);
  sidebarService = inject(SidebarService)

  workspaces: WritableSignal<Workspace[]> = signal<Workspace[]>([]);
  workspaceSub!: Subscription;
  isOpenSub!: Subscription;

  isOpen:WritableSignal<boolean> = signal<boolean>(false);


  ngOnInit(): void {
    this.workspaceSub = this.userWorkspacesService.workspaces$.subscribe(
      (workspaces) => {
        this.workspaces.set(workspaces);
      }
    );
    this.isOpenSub = this.sidebarService.isOpen$.subscribe((isOpen) => {
      this.isOpen.set(isOpen);
    });

    this.userWorkspacesService.getWorkspaces();
  }
  ngOnDestroy(): void {
    this.workspaceSub.unsubscribe();
    this.isOpenSub.unsubscribe();
  }
}
