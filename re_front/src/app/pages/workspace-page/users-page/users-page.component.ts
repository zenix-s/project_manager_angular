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

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [SectionComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  workspaceUsersService = inject(WorkspaceUsersService);
  toasterService = inject(ToasterService);

  workspaceUsersSubscription!: Subscription;

  idWorkspace: number = 0;

  users: WritableSignal<workspaceUsersData[]> = signal<workspaceUsersData[]>(
    []
  );

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
        this.users.set(users);
      });
  }

  ngOnDestroy(): void {
    this.workspaceUsersSubscription.unsubscribe();
  }
}
