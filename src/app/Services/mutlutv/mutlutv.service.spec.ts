import { TestBed } from '@angular/core/testing';

import { MutlutvService } from './mutlutv.service';

describe('MutlutvService', () => {
  let service: MutlutvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutlutvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
