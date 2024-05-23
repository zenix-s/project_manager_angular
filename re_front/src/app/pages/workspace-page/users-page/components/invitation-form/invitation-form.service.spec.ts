import { TestBed } from '@angular/core/testing';

import { InvitationFormService } from './invitation-form.service';

describe('InvitationFormService', () => {
  let service: InvitationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
