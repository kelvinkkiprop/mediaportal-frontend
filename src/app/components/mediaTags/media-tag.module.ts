import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { MediaTagRoutingModule } from './media-tag-routing.module';



@NgModule({
  declarations: [
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

    // add
    SharedModule,

    // import
    MediaTagRoutingModule,
  ]
})
export class MediaTagModule { }
