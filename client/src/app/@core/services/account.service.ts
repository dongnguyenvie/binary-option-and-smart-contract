import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  AsyncSubject,
  switchMap,
  tap,
} from 'rxjs';
import { API } from '../config/api';
import jwtDecode from 'jwt-decode';
import { Profile } from '../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _token = '';
  private $profile = new BehaviorSubject<Profile>(null as any);
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
      .post(API.login, {
        email,
        password,
      })
      .pipe(
        catchError(error => {
          return of(error);
        }),
      );
  }

  register(
    email: string,
    password: string,
    walletId: string,
    otp: string,
  ): Observable<any> {
    return this.http
      .post(API.register, {
        email,
        password,
        walletId,
        otp,
      })
      .pipe(
        catchError(error => {
          return of(error);
        }),
      );
  }

  fetchProfile() {
    return this.http.get<Profile>(API.profile).pipe(
      tap(result => this.$profile.next(result)),
      catchError(error => {
        return of(error);
      }),
    );
  }

  // async refreshProfile(force = false) {
  //   if (!force && !!this.profile) return;
  //   this.fetchProfile().subscribe(result => {
  //     this.$profile.next(result);
  //   });
  // }

  get profile() {
    return this.$profile;
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
    // setTimeout(() => {
    //   this.refreshProfile();
    // }, 300);
  }

  logout() {
    localStorage.clear();
    this.$currentUserLogin.next(null);
  }
}
