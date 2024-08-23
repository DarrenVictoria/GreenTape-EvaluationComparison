// src/app/services/shortlist-committee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortlistCommitteeData } from '../models/shortlist-committee.model';

@Injectable()

export class ShortlistCommitteeService {
  private apiUrl = 'api/shortlistCommitteeData';

  constructor(private http: HttpClient) { }

  getShortlistCommitteeData(): Observable<ShortlistCommitteeData> {
    return this.http.get<ShortlistCommitteeData>(this.apiUrl);
  }


}