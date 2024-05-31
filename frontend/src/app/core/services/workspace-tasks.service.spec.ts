import { TestBed } from '@angular/core/testing';

import { WorkspaceTasksService } from './workspace-tasks.service';

describe('WorkspaceTasksService', () => {
  let service: WorkspaceTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
