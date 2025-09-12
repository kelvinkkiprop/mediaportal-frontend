import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import Hls from 'hls.js';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-video-card',
  imports: [
      VgCoreModule,
      VgControlsModule,
      VgOverlayPlayModule,
      VgBufferingModule,
  ],
  standalone: true,
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent implements OnChanges, AfterViewInit {

  @Input() data!: any;
  @ViewChild('media', { static: true }) media!: ElementRef<HTMLVideoElement>;

  videoUrl: string = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  // videoUrl: string = 'http://localhost:8000/storage/videos/processed/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8';
  // videoUrl: string = 'http://localhost:8000/media/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8';


  item:any

  constructor(
    public mHomeService: DashboardService,
    // private sanitizer: DomSanitizer
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data?.id) {
      // here you could set `this.videoUrl` dynamically


      this.item = this.data
      console.log(this.item)
    }
  }

  ngAfterViewInit(): void {
    const video = this.media.nativeElement;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.videoUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari fallback
      video.src = this.videoUrl;
    }
  }
}
