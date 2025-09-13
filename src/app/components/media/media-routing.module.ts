import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
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
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Create'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: 'Edit'
    }
  },
  {
    path: ':id/show',
    component: ShowComponent,
    data: {
      title: 'Show'
    }
  },

  // Other
  {
    path: 'about',
    component: IndexComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'my-playlist',
    component: IndexComponent,
    data: {
      title: 'Index'
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
export class MediaRoutingModule { }
