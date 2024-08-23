import { TestBed, inject } from '@angular/core/testing';

import { ShortlistCommittee2ConvertorService } from './shortlist-committee-2-convertor.service';

describe('ShortlistCommittee2ConvertorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShortlistCommittee2ConvertorService]
    });
  });

  it('should be created', inject([ShortlistCommittee2ConvertorService], (service: ShortlistCommittee2ConvertorService) => {
    expect(service).toBeTruthy();
  }));
});
