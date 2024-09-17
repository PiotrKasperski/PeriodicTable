import { TestBed } from '@angular/core/testing';

import { AppStateActionsService } from './app-state-actions.service';

describe('AppStateActionsService', () => {
  let service: AppStateActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
