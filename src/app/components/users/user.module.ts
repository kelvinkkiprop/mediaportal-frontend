import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { MediaComponent } from './media/media.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,

    MediaComponent,
    PlaylistComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // add
    SharedModule,

    // import
    UserRoutingModule,

    // Add
    NgApexchartsModule,
    InfiniteScrollModule
  ]
})
export class UserModule { }
