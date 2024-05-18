import { TestBed } from '@angular/core/testing';

import { WorkspaceUsersService } from './workspace-users.service';

describe('WorkspaceUsersService', () => {
  let service: WorkspaceUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
