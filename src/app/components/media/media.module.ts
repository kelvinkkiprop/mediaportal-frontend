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


@NgModule({
  declarations: [
    // add
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    ReadComponent,
    LikedComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),


    // import
    MediaRoutingModule,
    SharedModule
  ]
})
export class MediaModule { }
