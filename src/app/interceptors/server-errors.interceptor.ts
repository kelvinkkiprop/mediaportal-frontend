// // server-errors.interceptor.ts
// import { inject } from '@angular/core';
// import {
//   HttpInterceptorFn,
//   HttpRequest,
//   HttpHandlerFn,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { tap } from 'rxjs';
// // import
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// export const serverErrorsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const toastr = inject(ToastrService);

//   return next(req).pipe(
//     tap({
//       next: () => {},
//       error: (error: HttpErrorResponse) => {
//         switch (error.status) {
//           case 400:
//             toastr.error('Bad request');
//             break;
//           case 401:
//             toastr.error('Unauthorized');
//             authService.localSignOut();
//             router.navigate(['/auth/login']);
//             break;
//           case 403:
//             toastr.error('Forbidden');
//             authService.localSignOut();
//             router.navigate(['/auth/login']);
//             break;
//           case 404:
//             toastr.error('Not found');
//             break;
//           case 408:
//             toastr.error('Time out');
//             break;
//           case 422:
//             toastr.error('Unprocessed content');
//             break;
//           case 500:
//             toastr.error('Internal server error');
//             break;
//           default:
//             router.navigateByUrl(`/error/common/${error.status}/${error.statusText}`);
//             break;
//         }
//       },
//     })
//   );
// };


// server-errors.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const serverErrorsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    tap({ next: () => {}, error: (error: HttpErrorResponse) => {
        // Handle network errors (e.g., backend not reachable)
        if (error.status === 0) {
          toastr.error('Unable to connect to the server. Please check your internet connection.');
          return;
        }

        // Map common HTTP status codes to user-friendly messages
        const errorMessages: Record<number, string> = {
          400: 'Bad request. Please check your input.',
          401: 'Session expired or unauthorized access. Please log in again.',
          403: 'Access denied. You do not have permission to perform this action.',
          404: 'Requested resource not found.',
          408: 'Request timeout. Please try again.',
          422: 'Unprocessable request. Please check the form fields.',
          500: 'Server encountered an error. Please try again later.',
        };

        const message = errorMessages[error.status] || `An unexpected error occurred (${error.status} - ${error.statusText}).`;
        toastr.error(message);

        // Handle authentication-related errors
        if ([401, 403].includes(error.status)) {
          authService.localSignOut();
          // Avoid redirect loops
          if (!router.url.includes('/auth/login')) {
            router.navigate(['/auth/login']);
          }
          return;
        }

        // Handle unrecognized errors with a generic error route
        if (!errorMessages[error.status]) {
          router.navigateByUrl(`/error/common/${error.status}/${encodeURIComponent(error.statusText)}`);
        }

        // Optional: Log detailed error info for debugging (disable in production)
        console.error('HTTP Error:', error);
      },
    })
  );
};
