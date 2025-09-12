import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';



@NgModule({
  declarations: [
    IndexComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Add
    SharedModule,

    // import
    HomeRoutingModule,
  ]
})
export class HomeModule { }
