import { TestBed, inject } from '@angular/core/testing';

import { AwarderConvetorService } from './awarder-convetor.service';

describe('AwarderConvetorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwarderConvetorService]
    });
  });

  it('should be created', inject([AwarderConvetorService], (service: AwarderConvetorService) => {
    expect(service).toBeTruthy();
  }));
});
