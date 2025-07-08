import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserBalanceResponse } from '../models/login.model';
import { Environment } from '../environment/environment';
import { map } from 'rxjs/operators';
import { catchError, retryWhen, delay, take, tap } from 'rxjs/operators';
import { of } from 'rxjs'; // if you're using `of([])` as fallback

@Injectable({ providedIn: 'root' })
export class InPlayService {
  baseUrl = Environment.baseUrl;
  errorMsg: any;
  authService: any;
  router: any;

  constructor(private http: HttpClient) {}

  validateLogin(userId: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validateLogin`, {
      userId,
      pass,
    });
  }

  // Store token logic (assumed to already exist)
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getInPlayGames(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/getInPlayGames`, {});
  }
  getTomorrowGames() {
    return this.http.post<any[]>(`${this.baseUrl}/getTomorrowGames`, {});
  }
  getMessageData(): Observable<any[]> {
    return this.http
      .post<{ status: string; data: any[] }>(
        `${this.baseUrl}/getMessageData`,
        {}
      )
      .pipe(
        map((res) => (res?.status === 'Success' ? res.data || [] : [])),
        catchError((err) => {
          console.error('Caught in service:', err.status, err.message);
          return of([]); // return empty array on error
        })
      );
  }

  getGameCounts(): Observable<any> {
    return this.http.post(`${this.baseUrl}/getGamesCount`, {});
  }
  getGameBySport(sportId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/getGamesList`, { sportId });
  }

  getMatchByEventId(eventid: string): Observable<any> {
    return this.http.post(`https://score1api.365cric.com/getMatchByEventId`, {
      eventid,
    });
  }
  getUserBalanceExpo(): Observable<UserBalanceResponse> {
    return this.http.post<UserBalanceResponse>(
      `${this.baseUrl}/getUserBalanceExpo`,
      {}
    );
  }

  getAccountLogs(pageNo: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Auth: ` ${token}`,
    });
    const payload = { pageNo };
    return this.http.post(
      `${this.baseUrl}/getAccountLogs`,
      { pageNo },
      { headers }
    );
  }

  getResults(
    startDate: string,
    endDate: string,
    sportId: number
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Auth: ` ${token}`,
    });
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('sportId', sportId.toString());

    const body = {
      startDate,
      endDate,
      sportId,
    };

    return this.http.post(`${this.baseUrl}/getListForResult`, body, {
      headers,
      params,
    });
  }

  getTodayGames(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/getTodayGames`, {});
  }

  getMatchTimelineDelta(eventid: string): Observable<any> {
    const url = `https://lmt.fn.sportradar.com/common/en/Etc:UTC/gismo/match_timelinedelta/${eventid}?T=exp=...`;
    return this.http.get<any>(url);
  }

 
  getEventDataOnLoad(eventid: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/getEventDataOnLoad`, { eventid });
  }
}
