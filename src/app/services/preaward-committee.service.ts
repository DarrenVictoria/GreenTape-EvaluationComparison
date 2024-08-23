// src/app/services/shortlist-committee-2.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortlistCommitteeData } from '../models/shortlist-committee.model';

@Injectable()
export class PreAwardCommitteeService {
  private apiUrl = 'api/preawardCommitteeData';

  constructor(private http: HttpClient) { }

  getPreAwardCommitteeData(): Observable<ShortlistCommitteeData> {
    return this.http.get<ShortlistCommitteeData>(this.apiUrl);
  }
}