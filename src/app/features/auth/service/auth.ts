import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable, tap } from 'rxjs';
import { logInPayload, SignUpPayload } from '../models/models';
import { LogIn } from '../components/log-in/log-in';
import { Router } from '@angular/router';
Router;
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private Router = inject(Router);
  signUp(data: SignUpPayload): Observable<any> {
    return this.http.post(`/auth/v1/signup`, data);
  }

  LogIn(data: logInPayload): Observable<any> {
    return this.http.post(`/auth/v1/token?grant_type=password`, data);
  }

  getUserData(): Observable<any> {
    return this.http.get('/auth/v1/user');
  }

  logOut(data: any): Observable<any> {
    return this.http.post('/auth/v1/logout', data);
  }

  forgetPassword(payload:any): Observable<any>{
    return this.http.post('/auth/v1/recover', payload);

  }

  saveSession(data: any, rememberMe: any) {
     localStorage.clear();
     sessionStorage.clear();
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('accessToken', data.access_token);
    storage.setItem('refreshToken', data.refresh_token);
    storage.setItem('expiresAt', data.expires_at);
  }

  updateAccessToken() {
    const storage = this.getStorage();

    const payload = {
      refresh_token: storage.getItem('refreshToken'),
    };

    return this.http.post('/auth/v1/token?grant_type=refresh_token', payload).pipe(
      tap((res: any) => {
        storage.setItem('accessToken', res.access_token);
        storage.setItem('refreshToken', res.refresh_token);
        storage.setItem('expiresAt', res.expires_at.toString());
      }),
    );
  }

   getStorage(): Storage {
    if (localStorage.getItem('refreshToken')) {
      return localStorage;
    }

    return sessionStorage;
  }
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') ?? sessionStorage.getItem('refreshToken');
  }

  isTokenExpired(): boolean {
    const storage = this.getStorage();
    const expiresAt = storage.getItem('expiresAt');

    if (!expiresAt) {
      return true;
    }
    const now = Math.floor(Date.now() / 1000);
    return now >= Number(expiresAt);
  }


 
}
