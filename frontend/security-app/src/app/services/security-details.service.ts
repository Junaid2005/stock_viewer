import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SecurityInfo {
  currentPrice: number;
  currency: string;
  marketCap: number;
  quoteType: string;
  sectorDisp: string;
  symbol: string;
  shortName: string;
}

export interface SecurityPricing {
  Datetime: string;
  Open: number;
}

export interface ReturnedPricing {
  pricingList: SecurityPricing[]
}

export interface Response<T> {
  code: number;
  message: string;
  body: T;
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private apiUrl = 'http://127.0.0.1:5000/api/security';

  constructor(private http: HttpClient) {}

  getSecurity(identifier: string): Observable<Response<SecurityInfo>> {
    return this.http.get<Response<SecurityInfo>>(`${this.apiUrl}/${identifier}`);
  }

  getPrices(identifier: string, period: string, interval: string): Observable<Response<ReturnedPricing>> {
    return this.http.get<Response<ReturnedPricing>>(`${this.apiUrl}/${identifier}/${period}/${interval}`);
  }
}
