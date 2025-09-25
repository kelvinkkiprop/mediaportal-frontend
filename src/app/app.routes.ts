import { Routes } from '@angular/router';
import { AdminLTEComponent } from './containers/admin-lte/admin-lte.component';
import { AuthUIComponent } from './containers/auth-ui/auth-ui.component';
import { VerificationGuard } from './guards/verify.guard';
import { ErrorUIComponent } from './containers/error-ui/error-ui.component';

// export const routes: Routes = [];


export const routes: Routes = [

  // Auth
  {
    path: '',
    component: AuthUIComponent,
    data: {
      title: 'Auth',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./components/auth/auth.module').then((m) => m.AuthModule)
      },
    ]
  },


  // AdminLTE
  {
    path: '',
    component: AdminLTEComponent,
    data: {
      title: 'Dashboard',
    },
    // canActivate: [VerificationGuard, WithProfileGuard],
    // canActivateChild: [VerificationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        canActivate: [VerificationGuard],
        path: 'users',
        loadChildren: () =>
          import('./components/users/user.module').then((m) => m.UserModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./components/categories/category.module').then((m) => m.CategoryModule)
      },
      {
        path: 'media',
        loadChildren: () =>
          import('./components/media/media.module').then((m) => m.MediaModule)
      },
      // {
      //   path: 'live-stream',
      //   loadChildren: () =>
      //     import('./components/live-stream/live-stream.module').then((m) => m.LiveStreamModule)
      // },
      // {
      //   path: 'payments',
      //   loadChildren: () =>
      //     import('./components/payments/payment.module').then((m) => m.PaymentModule)
      // },
      {
        canActivate: [VerificationGuard],
        path: 'profile',
        loadChildren: () =>
          import('./components/profiles/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./components/about/about.module').then((m) => m.AboutModule)
      },
      {
        path: 'terms',
        loadChildren: () =>
          import('./components/terms/terms.module').then((m) => m.TermsModule)
      },
    ]
  },


  // Error
  {
    path: '',
    component: ErrorUIComponent,
    data: {
      title: 'Error',
    },
    children: [
      {
        path: 'error',
        loadChildren: () =>
          import('./components/errors/error.module').then((m) => m.ErrorModule)
      },
    ]
  },
  { path: '**', redirectTo: "/error/404" },


];
