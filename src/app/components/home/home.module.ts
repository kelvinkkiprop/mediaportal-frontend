import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VideoCardComponent } from '../shared/video-card/video-card.component';
import { ShowComponent } from './show/show.component';



@NgModule({
  declarations: [
    // add
    IndexComponent,
    ShowComponent,
    // LearnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // import
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
