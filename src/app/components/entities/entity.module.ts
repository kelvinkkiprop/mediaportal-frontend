import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EntityRoutingModule } from './entity-routing.module';
import { IndexComponent } from './index/index.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    // add
    IndexComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // import
    EntityRoutingModule,
    SharedModule,

    // Add
    InfiniteScrollModule
  ]
})
export class EntityModule { }
