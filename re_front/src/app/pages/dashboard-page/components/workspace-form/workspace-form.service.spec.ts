import { TestBed } from '@angular/core/testing';

import { WorkspaceFormService } from './workspace-form.service';

describe('WorkspaceFormService', () => {
  let service: WorkspaceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
