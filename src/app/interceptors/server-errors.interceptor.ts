// server-errors.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs';
// import
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const serverErrorsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    tap({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            toastr.error('Bad request');
            break;
          case 401:
            toastr.error('Unauthorized');
            authService.localSignOut();
            router.navigate(['/auth/login']);
            break;
          case 403:
            toastr.error('Forbidden');
            authService.localSignOut();
            router.navigate(['/auth/login']);
            break;
          case 404:
            toastr.error('Not found');
            break;
          case 408:
            toastr.error('Time out');
            break;
          case 422:
            toastr.error('Unprocessed content');
            break;
          case 500:
            toastr.error('Internal server error');
            break;
          default:
            router.navigateByUrl(`/error/common/${error.status}/${error.statusText}`);
            break;
        }
      },
    })
  );
};
