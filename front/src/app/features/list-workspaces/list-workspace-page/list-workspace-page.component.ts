import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { WorkspaceService } from '@app/service/workspace.service';
import { Workspace } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-workspace-page',
  templateUrl: './list-workspace-page.component.html',
  styles: ':host { display: block; width: 100%; }',
})
export class ListWorkspacePageComponent implements OnInit, OnDestroy {
  private workspaceService = inject(WorkspaceService);

  workspaces: WritableSignal<Workspace[]> = signal<Workspace[]>([]);

  workspaceSubscription!: Subscription;

  ngOnInit(): void {
    this.workspaceSubscription = this.workspaceService.workspace$.subscribe(
      (workspaces) => {
        this.workspaces.set(workspaces);
      }
    );

    this.workspaceService.getWorkspaces();
  }
  ngOnDestroy(): void {
    this.workspaceSubscription.unsubscribe();
  }
}
