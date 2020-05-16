import { TestBed } from '@angular/core/testing';

import { SemeService } from './seme.service';

describe('SemeServiceService', () => {
  let service: SemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
