import { CommonModule } from '@angular/common';
// import
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './inc/admin/admin.component';
import { OtherComponent } from './inc/other/other.component';
import { MediaCardComponent } from "../shared/media-card/media-card.component";



@NgModule({
  declarations: [
    // add
    IndexComponent,
    AdminComponent,
    OtherComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // import
    DashboardRoutingModule,

    // Add
    SharedModule,
    MediaCardComponent
]
})
export class DashboardModule { }
