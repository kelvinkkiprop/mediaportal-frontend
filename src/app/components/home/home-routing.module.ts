import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

// Routes
const routes: Routes = [
  {
    path: '',
    // redirectTo: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'index'
    }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {
      title: 'privacy-policy'
    }
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    data: {
      title: 'terms-of-service'
    }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Add
    RouterModule.forChild(routes)
  ],
  // Add
  exports: [RouterModule]
})

export class HomeRoutingModule { }
