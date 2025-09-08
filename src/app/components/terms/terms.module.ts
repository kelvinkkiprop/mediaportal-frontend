import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { TermsRoutingModule } from '../terms/terms-routing.module';



@NgModule({
  declarations: [
    // add
    IndexComponent,
    // AdminComponent,
    // LearnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // import
    TermsRoutingModule,
    SharedModule
  ]
})
export class TermsModule { }
