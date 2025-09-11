import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UploadRoutingModule } from './upload-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    // add
    IndexComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),


    // import
    UploadRoutingModule,
    SharedModule
  ]
})
export class UploadModule { }
