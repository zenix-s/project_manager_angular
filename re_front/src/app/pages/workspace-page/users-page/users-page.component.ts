import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceUsersService } from '@app/core/services/workspace-users.service';
import { ToasterService } from '@app/core/toaster/service/toaster.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { workspaceUsersData } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { InvitationFormComponent } from './components/invitation-form/invitation-form.component';
import { InvitationFormService } from './components/invitation-form/invitation-form.service';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { DropdownComponent } from '@app/shared/components/dropdown/dropdown/dropdown.component';
import { DropdownItemComponent } from '@app/shared/components/dropdown/dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '@app/shared/components/dropdown/dropdown-list/dropdown-list.component';
import { listRole } from '@env/interface.env';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    SectionComponent,
    InvitationFormComponent,
    ButtonComponent,
    DropdownComponent,
    DropdownItemComponent,
    DropdownListComponent,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  workspaceUsersService = inject(WorkspaceUsersService);
  toasterService = inject(ToasterService);
  invitationFormService = inject(InvitationFormService);

  workspaceUsersSubscription!: Subscription;

  idWorkspace: number = 0;

  get listRole() {
    return listRole;
  }

  users: WritableSignal<workspaceUsersData[]> = signal<workspaceUsersData[]>(
    []
  );

  changeRole(idUserWorkspace: number, role: string) {
    console.log('changeRole', idUserWorkspace, role);
    // this.workspaceUsersService.changeRole(idUserWorkspace, role);
  }

  ngOnInit(): void {
    let idWorkspace: number;
    this.activatedRoute.parent!.paramMap.subscribe((params) => {
      console.log('idWorkspace', params.get('idWorkspace'));
      if (!params.has('idWorkspace')) {
        this.toasterService.error('No se ha encontrado el espacio de trabajo');
        this.router.navigate(['/']);
      }
      idWorkspace = parseInt(params.get('idWorkspace') as any);
      if (isNaN(idWorkspace) || !isFinite(idWorkspace) || idWorkspace < 0) {
        this.router.navigate(['/']);
      }

      this.idWorkspace = idWorkspace;

      this.workspaceUsersService.getWorkspaceUsers(idWorkspace);
    });

    this.workspaceUsersSubscription =
      this.workspaceUsersService.users$.subscribe((users) => {
        console.log('users', users);
        this.users.set(users);
      });
  }

  ngOnDestroy(): void {
    this.workspaceUsersSubscription.unsubscribe();
  }
}
