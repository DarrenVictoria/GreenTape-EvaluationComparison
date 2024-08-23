import { TestBed, inject } from '@angular/core/testing';

import { PreawardCommitteeConvertorService } from './preaward-committee-convertor.service';

describe('PreawardCommitteeConvertorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreawardCommitteeConvertorService]
    });
  });

  it('should be created', inject([PreawardCommitteeConvertorService], (service: PreawardCommitteeConvertorService) => {
    expect(service).toBeTruthy();
  }));
});
