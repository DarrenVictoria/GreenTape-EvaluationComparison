import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AwarderFullData } from '../models/awarder.model';

@Injectable()
export class AwarderService {
  private apiUrl = 'api/awarderData'; // This should match the key in InMemoryDataService

  constructor(private http: HttpClient) { }

  getAwarderData(): Observable<AwarderFullData> {
    return this.http.get<AwarderFullData>(this.apiUrl);
  }
}