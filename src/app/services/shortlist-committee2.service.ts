// src/app/services/shortlist-committee-2.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortlistCommitteeData } from '../models/shortlist-committee.model';

@Injectable()
export class ShortlistCommittee2Service {
  private apiUrl = 'api/shortlistCommittee2Data';

  constructor(private http: HttpClient) { }

  getShortlistCommittee2Data(): Observable<ShortlistCommitteeData> {
    return this.http.get<ShortlistCommitteeData>(this.apiUrl);
  }
}