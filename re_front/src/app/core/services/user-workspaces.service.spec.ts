import { TestBed } from '@angular/core/testing';

import { UserWorkspacesService } from './user-workspaces.service';

describe('UserWorkspacesService', () => {
  let service: UserWorkspacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWorkspacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
