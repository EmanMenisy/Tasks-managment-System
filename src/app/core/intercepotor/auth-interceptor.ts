import { switchMap } from "rxjs";
import { environment } from "../../../environment/environment";
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "../../features/auth/service/auth";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  const token = authService.getAccessToken();

  const clonedReq = req.clone({
    url: `${environment.baseUrl}${req.url}`,
    setHeaders: {
      apikey: environment.apiKey,
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedReq);
};