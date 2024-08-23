import { TestBed, inject } from '@angular/core/testing';

import { ScoreSheetService } from './score-sheet.service';

describe('ScoreSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoreSheetService]
    });
  });

  it('should be created', inject([ScoreSheetService], (service: ScoreSheetService) => {
    expect(service).toBeTruthy();
  }));
});
