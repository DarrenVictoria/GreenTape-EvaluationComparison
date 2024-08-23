import { TestBed, inject } from '@angular/core/testing';

import { AwarderService } from './awarder.service';

describe('AwarderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwarderService]
    });
  });

  it('should be created', inject([AwarderService], (service: AwarderService) => {
    expect(service).toBeTruthy();
  }));
});
