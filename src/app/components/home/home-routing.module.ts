import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';

// Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'show/:id',
    component: ShowComponent,
    data: {
      title: 'Show'
    }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Add
    RouterModule.forChild(routes)
  ],
  // Add
  exports: [RouterModule]
})
export class HomeRoutingModule { }
