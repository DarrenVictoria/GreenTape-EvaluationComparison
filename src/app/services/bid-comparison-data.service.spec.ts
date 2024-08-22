import { TestBed, inject } from '@angular/core/testing';

import { BidComparisonDataService } from './bid-comparison-data.service';

describe('BidComparisonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidComparisonDataService]
    });
  });

  it('should be created', inject([BidComparisonDataService], (service: BidComparisonDataService) => {
    expect(service).toBeTruthy();
  }));
});
