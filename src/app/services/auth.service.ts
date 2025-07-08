import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest {
  userId: string;
  pass: string;
  validCode: string;
}

export interface LoginResponse {
  status: boolean;
  token?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://ag.bet36.live/api-V2';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  setLoginStatus(status: boolean): void {
    this._isLoggedIn$.next(status);
  }

  public hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
  validateLogin(data: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/validateLogin`, data)
      .pipe(
        tap((res) => {
          if (res.status && res.token) {
            this.storeToken(res.token);
            console.log('Login success');

            this._isLoggedIn$.next(true);
          }
        })
      );
  }

  storeToken(token: string): void {
    // if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    // }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }
}
