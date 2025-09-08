import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

import { HlsPlayerComponent } from './hls-player/hls-player.component';
import { VideoCardComponent } from './video-card/video-card.component';

@NgModule({
  declarations: [
  ],
  imports: [
    // CommonModule,
    HlsPlayerComponent,
    VideoCardComponent
  ],
  exports: [
    HlsPlayerComponent,
    VideoCardComponent
  ],
})
export class SharedModule {}
