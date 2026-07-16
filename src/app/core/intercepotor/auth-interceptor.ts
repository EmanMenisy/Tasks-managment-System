import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Auth } from '../../features/auth/service/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const url = `${environment.baseUrl}${req.url}`;
  const token = authService.getAccessToken();

  const clonedReq = req.clone({
    url,
    setHeaders: {
      apikey: environment.apiKey,
      Authorization: `Bearer ${token}`,
    },
  });


  return next(clonedReq);
};