import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthService).token();

  // Si no hay token o la petición no va hacia nuestra API,
  // se envía sin modificar.
  if (!token || !req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  // Agrega el token a las peticiones de nuestra API
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};