import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { API } from '../config/api';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _token = '';
  private $currentUserLogin = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (!!token) {
      this._token = token;
      this.setUserByToken(token);
    }
  }

  setUserByToken(token: string) {
    let user;
    try {
      user = jwtDecode(token || this._token);
    } catch (Error) {}
    this.$currentUserLogin.next(user);
  }

  getUser() {
    return this.$currentUserLogin.asObservable();
  }

  get token() {
    return this._token;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(API.LOGIN, {
        email,
        password,
      })
      .pipe(
        catchError(error => {
          return of(error);
        }),
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http
      .post(API.REGISTER, {
        email,
        password,
      })
      .pipe(
        catchError(error => {
          return of(error);
        }),
      );
  }

  getToken(): string {
    return this._token;
  }

  getRefreshToken(): string {
    const refresh_token = localStorage.getItem('refresh_token');
    return refresh_token || '';
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._token = token;
  }

  logout() {
    localStorage.clear();
    this.$currentUserLogin.next(null);
  }
}
