import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: ':param1/:param2',
    pathMatch: 'full'
  },
  {
    path: ':param1/:param2',
    component: IndexComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: 'Error 404'
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
export class ErrorRoutingModule { }
