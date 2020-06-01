import { TestBed } from '@angular/core/testing';

import { ShoolDataService } from './shool-data.service';

describe('ShoolDataService', () => {
  let service: ShoolDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoolDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
