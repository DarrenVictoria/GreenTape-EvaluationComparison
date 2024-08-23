import { TestBed, inject } from '@angular/core/testing';

import { PreawardCommitteeService } from './preaward-committee.service';

describe('PreawardCommitteeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreawardCommitteeService]
    });
  });

  it('should be created', inject([PreawardCommitteeService], (service: PreawardCommitteeService) => {
    expect(service).toBeTruthy();
  }));
});
