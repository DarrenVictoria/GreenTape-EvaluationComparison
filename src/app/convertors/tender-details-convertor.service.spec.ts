import { TestBed, inject } from '@angular/core/testing';

import { TenderDetailsConvertorService } from './tender-details-convertor.service';

describe('TenderDetailsConvertorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenderDetailsConvertorService]
    });
  });

  it('should be created', inject([TenderDetailsConvertorService], (service: TenderDetailsConvertorService) => {
    expect(service).toBeTruthy();
  }));
});
