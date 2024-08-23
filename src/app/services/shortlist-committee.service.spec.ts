import { TestBed, inject } from '@angular/core/testing';

import { ShortlistCommitteeService } from './shortlist-committee.service';

describe('ShortlistCommitteeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShortlistCommitteeService]
    });
  });

  it('should be created', inject([ShortlistCommitteeService], (service: ShortlistCommitteeService) => {
    expect(service).toBeTruthy();
  }));
});
