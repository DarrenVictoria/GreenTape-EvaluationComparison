import { TestBed, inject } from '@angular/core/testing';

import { TenderDetailsService } from './tender-details.service';

describe('TenderDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenderDetailsService]
    });
  });

  it('should be created', inject([TenderDetailsService], (service: TenderDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
