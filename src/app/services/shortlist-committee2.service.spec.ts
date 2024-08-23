import { TestBed, inject } from '@angular/core/testing';

import { ShortlistCommittee2Service } from './shortlist-committee2.service';

describe('ShortlistCommittee2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShortlistCommittee2Service]
    });
  });

  it('should be created', inject([ShortlistCommittee2Service], (service: ShortlistCommittee2Service) => {
    expect(service).toBeTruthy();
  }));
});
