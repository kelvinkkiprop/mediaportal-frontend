import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

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
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Create'
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
export class UploadRoutingModule { }
