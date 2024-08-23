import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BidData } from '../models/bid-comparison.model';
import { BidComparisonConvertorService } from '../convertors/bid-comparison-convertor.service';

@Injectable()

export class BidComparisonDataService {
  private apiUrl = 'api/bidData'; // URL to web api

  constructor(
    private http: HttpClient,
    private convertorService: BidComparisonConvertorService
  ) { }

  getProcessedBidData(): Observable<{ bidData: BidData, companyTotals: number[] }> {
    return this.getBidData().pipe(
      map(bidData => {
        const companyTotals = this.convertorService.calculateTotals(bidData);
        return { bidData, companyTotals };
      })
    );
  }

  private getBidData(): Observable<BidData> {
    return this.http.get<BidData>(this.apiUrl).pipe(
      catchError(this.handleError<BidData>('getBidData', null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable(subscriber => subscriber.next(result as T));
    };
  }
}