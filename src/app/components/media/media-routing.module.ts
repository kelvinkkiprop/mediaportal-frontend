import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { LikedComponent } from './liked/liked.component';
import { HistoryComponent } from './history/history.component';
import { AnalyticsComponent } from './inc/analytics/analytics.component';
import { LiveStreamsComponent } from './inc/live-streams/live-streams.component';
import { ProcessComponent } from './process/process.component';
import { ReadComponent } from './inc/read/read.component';
import { WatchComponent } from './watch/watch.component';

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
  {
    path: 'watch',
    component: WatchComponent,
    data: {
      title: 'Watch'
    }
  },
  {
    path: 'liked',
    component: LikedComponent,
    data: {
      title: 'Liked'
    }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      title: 'History'
    }
  },


  // Inc
  {
    path: 'about',
    component: ReadComponent,
    data: {
      title: 'Read'
    }
  },
  {
    path: 'my-media',
    component: ReadComponent,
    data: {
      title: 'Read'
    }
  },
  {
    path: 'my-playlist',
    component: ReadComponent,
    data: {
      title: 'Read'
    }
  },
  {
    path: 'live-streams',
    component: ReadComponent,
    data: {
      title: 'Index'
    }
  },
  {
    path: 'analytics',
    component: ReadComponent,
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
