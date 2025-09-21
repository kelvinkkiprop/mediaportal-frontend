import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { MediaRoutingModule } from './media-routing.module';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { ReadComponent } from './inc/read/read.component';
import { LikedComponent } from './inc/liked/liked.component';
import { HistoryComponent } from './inc/history/history.component';
import { LiveStreamsComponent } from './inc/live-streams/live-streams.component';
import { AnalyticsComponent } from './inc/analytics/analytics.component';

import { NgApexchartsModule } from "ng-apexcharts";
import { ProcessComponent } from './inc/process/process.component';
import { RelatedComponent } from './show/inc/related/related.component';
import { CommentsComponent } from './show/inc/comments/comments.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    // add
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    ReadComponent,

    LikedComponent,
    HistoryComponent,
    LiveStreamsComponent,
    AnalyticsComponent,
    ProcessComponent,

    RelatedComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),

    // import
    MediaRoutingModule,
    SharedModule,

    // Add
    NgApexchartsModule,
    InfiniteScrollModule
  ]
})
export class MediaModule { }
