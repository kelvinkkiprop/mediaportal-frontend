import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // import
    ReportRoutingModule,

    // add
    SharedModule,
    NgApexchartsModule,
  ]
})
export class ReportModule { }
