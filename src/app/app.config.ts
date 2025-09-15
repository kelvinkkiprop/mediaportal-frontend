import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
// Add
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { serverErrorsInterceptor } from './interceptors/server-errors.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Add
    provideHttpClient(
      // RegisterInterceptors
      withInterceptors([authInterceptor, serverErrorsInterceptor])
    ),

    // Toastr
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      // positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),

  ]
}
