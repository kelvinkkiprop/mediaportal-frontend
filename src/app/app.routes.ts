import { Routes } from '@angular/router';
import { AdminLTEComponent } from './containers/admin-lte/admin-lte.component';

// export const routes: Routes = [];


export const routes: Routes = [

  // // Auth
  // {
  //   path: '',
  //   component: AuthUIComponent,
  //   data: {
  //     title: 'Auth',
  //   },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./components/home/home.module').then((m) => m.HomeModule)
  //     },
  //     {
  //       path: 'auth',
  //       loadChildren: () =>
  //         import('./components/auth/auth.module').then((m) => m.AuthModule)
  //     },
  //   ]
  // },


  // AdminLTE
  {
    path: '',
    component: AdminLTEComponent,
    data: {
      title: 'Dashboard',
    },
    // canActivate: [VerificationGuard, WithProfileGuard],
    // canActivateChild: [VerificationGuard, WithProfileGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'upload',
        loadChildren: () =>
          import('./components/upload/upload.module').then((m) => m.UploadModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/user.module').then((m) => m.UserModule)
      },
      {
        path: 'media-categories',
        loadChildren: () =>
          import('./components/mediaCategories/media-category.module').then((m) => m.MediaCategoryModule)
      },
      {
        path: 'media-tags',
        loadChildren: () =>
          import('./components/mediaTags/media-tag.module').then((m) => m.MediaTagModule)
      },
      // {
      //   path: 'payments',
      //   loadChildren: () =>
      //     import('./components/payments/payment.module').then((m) => m.PaymentModule)
      // },
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


//   // Error
//   {
//     path: '',
//     component: ErrorUIComponent,
//     data: {
//       title: 'Error',
//     },
//     children: [
//       {
//         path: 'error',
//         loadChildren: () =>
//           import('./components/errors/error.module').then((m) => m.ErrorModule)
//       },
//     ]
//   },
//   { path: '**', redirectTo: "/error/404" },


];
