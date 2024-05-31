import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserWorkspacesService } from '@app/core/services/user-workspaces.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { Workspace } from '@env/interface.env';
import { Subscription } from 'rxjs';
import { WorkspaceFormService } from './components/workspace-form/workspace-form.service';
import { WorkspaceFormComponent } from './components/workspace-form/workspace-form.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SectionComponent, RouterLink, SidebarComponent, WorkspaceFormComponent, ButtonComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  userWorkspacesService = inject(UserWorkspacesService);
  workspaceFormService = inject(WorkspaceFormService)

  userWorkspaces: WritableSignal<Workspace[]> = signal<Workspace[]>([]);
  userWorkspacesSubscription!:Subscription;

  ngOnInit(): void {
    this.userWorkspacesSubscription = this.userWorkspacesService.workspaces$.subscribe({
      next: (workspaces) => {
        this.userWorkspaces.set(workspaces);
      }
    });
    this.userWorkspacesService.getWorkspaces();
  }

  ngOnDestroy(): void {
    this.userWorkspacesSubscription.unsubscribe();
  }

}
