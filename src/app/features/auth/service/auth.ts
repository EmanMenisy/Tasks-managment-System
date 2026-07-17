import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { logInPayload, SignUpPayload } from '../models/models';
import { LogIn } from '../components/log-in/log-in';
import { Router } from '@angular/router';
Router
@Injectable({
  providedIn: 'root',
})
export class Auth {
   private http = inject(HttpClient);
   private Router = inject(Router);
   signUp(data:SignUpPayload):Observable<any>{
    return  this.http.post(`/auth/v1/signup` , data);
   }

   LogIn(data:logInPayload):Observable<any>{
    return  this.http.post(`/auth/v1/token?grant_type=password` , data);
   }

   getUserData():Observable<any>{
    return  this.http.get('/auth/v1/user');
   }

  logOut(data:any):Observable<any>{
    return  this.http.post('/auth/v1/logout' , data);
  }

  saveSession(data:any , rememberMe:any){
      const storage = rememberMe? localStorage : sessionStorage;
      storage.setItem('accessToken' , data.access_token);
      storage.setItem('refreshToken' , data.refresh_token);
      if(rememberMe){
        let oneMonthFromNow = Date.now() + 30 * 24 * 60 * 60 * 1000 ;
        localStorage.setItem ('rememberMeUntil' ,oneMonthFromNow.toString());
      }
   }

   updateAccessToken(){
      setInterval
   }
  getAccessToken(): string | null {
  return localStorage.getItem('accessToken') ?? sessionStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') ?? sessionStorage.getItem('refresh_token');
  }

  isRememberExpired(): boolean {
  const rememberUntil = localStorage.getItem('remember_until');

  if (!rememberUntil) return true; 

  return Date.now() >= +rememberUntil;
}

clearSession(): void {
  localStorage.clear();
  sessionStorage.clear();
}

checkRememberStatus(): void {
  if (this.isRememberExpired()) {
    this.clearSession();
    this.Router.navigate(['/auth/log-in']);
  }
}



}
