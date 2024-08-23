import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenderDetails } from '../models/tender-details.model';

@Injectable()
export class TenderDetailsService {
  private apiUrl = 'api/tenderDetails';

  constructor(private http: HttpClient) { }

  getTenderDetails(): Observable<TenderDetails> {
    return this.http.get<TenderDetails>(this.apiUrl);
  }
}