import { TestBed, inject } from '@angular/core/testing';

import { ScoreSheetConvertorService } from './score-sheet-convertor.service';

describe('ScoreSheetConvertorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreSheetConvertorService]
    });
  });

  it('should be created', inject([ScoreSheetConvertorService], (service: ScoreSheetConvertorService) => {
    expect(service).toBeTruthy();
  }));
});
