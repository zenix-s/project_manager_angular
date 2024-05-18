import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserWorkspacesService } from '@app/core/services/user-workspaces.service';
import { SectionComponent } from '@app/shared/components/section/section.component';
import { Workspace } from '@env/interface.env';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [SectionComponent, RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  userWorkspacesService = inject(UserWorkspacesService);

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
