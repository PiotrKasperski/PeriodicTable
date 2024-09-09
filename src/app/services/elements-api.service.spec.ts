import { TestBed } from '@angular/core/testing';

import { ElementsApiService } from './elements-api.service';

describe('ElementsApiService', () => {
  let service: ElementsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
