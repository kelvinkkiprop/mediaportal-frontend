import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { LikedComponent } from './inc/liked/liked.component';
import { HistoryComponent } from './inc/history/history.component';
import { AnalyticsComponent } from './inc/analytics/analytics.component';
import { LiveStreamsComponent } from './inc/live-streams/live-streams.component';
import { ProcessComponent } from './inc/process/process.component';

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
    path: 'show/:id',
    component: ShowComponent,
    data: {
      title: 'Show'
    }
  },

  // Inc
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
  {
    path: 'liked',
    component: LikedComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'live-streams',
    component: IndexComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'analytics',
    component: IndexComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'process/:id',
    component: ProcessComponent,
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
export class MediaRoutingModule { }
