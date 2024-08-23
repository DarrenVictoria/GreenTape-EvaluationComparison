// services/score-sheet.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreSheetData } from '../models/score-sheet.model';

@Injectable()
export class ScoreSheetService {
  private apiUrl = 'api/scoreSheetData';

  constructor(private http: HttpClient) { }

  getScoreSheetData(): Observable<ScoreSheetData> {
    return this.http.get<ScoreSheetData>(this.apiUrl);
  }
}