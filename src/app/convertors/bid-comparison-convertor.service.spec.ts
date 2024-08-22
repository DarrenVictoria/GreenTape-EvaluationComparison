import { TestBed, inject } from '@angular/core/testing';

import { BidComparisonConvertorService } from './bid-comparison-convertor.service';

describe('BidComparisonConvertorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidComparisonConvertorService]
    });
  });

  it('should be created', inject([BidComparisonConvertorService], (service: BidComparisonConvertorService) => {
    expect(service).toBeTruthy();
  }));
});
