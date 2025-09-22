import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { LiveStreamRoutingModule } from './live-stream-routing.module';
import { ShowComponent } from './show/show.component';


@NgModule({
  declarations: [
    // add
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),


    // import
    LiveStreamRoutingModule,
    SharedModule
  ]
})
export class LiveStreamModule { }
