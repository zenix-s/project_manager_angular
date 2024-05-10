import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { WorkspaceUsersService } from '@app/service/workspace-users.service';

import { workspaceUsersData } from '@types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnInit, OnDestroy {
  @Input()
  idWorkspace!: number;

  usersService = inject(WorkspaceUsersService);

  users: WritableSignal<workspaceUsersData[]> = signal<workspaceUsersData[]>(
    []
  );

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.usersService.workspaceUsers$.subscribe((data) => {
      this.users.set(data);
    });
    this.usersService.getWorkspaceUsers(this.idWorkspace);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
