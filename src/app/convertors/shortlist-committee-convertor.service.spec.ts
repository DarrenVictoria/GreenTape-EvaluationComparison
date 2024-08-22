import { TestBed, inject } from '@angular/core/testing';

import { ShortlistCommitteeConvertorService } from './shortlist-committee-convertor.service';

describe('ShortlistCommitteeConvertorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShortlistCommitteeConvertorService]
    });
  });

  it('should be created', inject([ShortlistCommitteeConvertorService], (service: ShortlistCommitteeConvertorService) => {
    expect(service).toBeTruthy();
  }));
});
