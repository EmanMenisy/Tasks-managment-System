import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { SignUpPayload } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private http = inject(HttpClient);

   signUp(data:SignUpPayload):Observable<any>{
    return  this.http.post(`${environment.baseUrl}//auth/v1/signup` , data ,{
    headers: {
      apikey: environment.apiKey,
    },
  });
   }

}
