import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { IndexComponent } from './index/index.component';



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
    AboutRoutingModule,
    SharedModule
  ]
})
export class AboutModule { }
