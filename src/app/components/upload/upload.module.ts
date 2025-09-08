import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UploadRoutingModule } from './upload-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';


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

    // import
    UploadRoutingModule,
    // SharedModule
  ]
})
export class UploadModule { }
