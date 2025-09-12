import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  const authService = inject(AuthService);
  const currentUser = authService.currentUser;

  // AddAuthorizationHeaderWithTokenIfAvailable
  if (currentUser && currentUser.token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
          }
      });
  }

  // Proceed
  return next(request);
};
