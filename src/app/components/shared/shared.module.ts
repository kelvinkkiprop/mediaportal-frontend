import { NgModule } from '@angular/core';
// import
import { HlsPlayerComponent } from './hls-player/hls-player.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { ProgressComponent } from './progress/progress.component';
import { VideoCardComponent } from './video-card/video-card.component';

@NgModule({
  declarations: [
  ],
  imports: [
    // CommonModule,
    ProgressComponent,
    HlsPlayerComponent,
    VideoCardComponent,
    MediaCardComponent
  ],
  exports: [
    ProgressComponent,
    HlsPlayerComponent,
    VideoCardComponent,
    MediaCardComponent
  ],
})
export class SharedModule {}
