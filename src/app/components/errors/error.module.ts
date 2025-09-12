import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { ErrorRoutingModule } from './error-routing.module';



@NgModule({
  declarations: [
    // add
    IndexComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // import
    ErrorRoutingModule,
  ]
})
export class ErrorModule { }
