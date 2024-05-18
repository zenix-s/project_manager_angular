import { TestBed } from '@angular/core/testing';

import { WorkspaceTaskCategoriesService } from './workspace-task-categories.service';

describe('WorkspaceTaskCategoriesService', () => {
  let service: WorkspaceTaskCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceTaskCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
