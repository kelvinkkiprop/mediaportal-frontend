import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ShowComponent } from './show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    ShowComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // add
    SharedModule,

    // import
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
