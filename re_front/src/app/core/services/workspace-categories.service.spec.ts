import { TestBed } from '@angular/core/testing';

import { WorkspaceCategoriesService } from './workspace-categories.service';

describe('WorkspaceCategoriesService', () => {
  let service: WorkspaceCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
