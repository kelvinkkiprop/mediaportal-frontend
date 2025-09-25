// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Input, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import Hls from 'hls.js';

@Component({
  selector: 'app-hls-player',
  imports: [
      VgCoreModule,
      VgControlsModule,
      VgOverlayPlayModule,
      VgBufferingModule,
      CommonModule
  ],
  standalone: true,
  templateUrl: './hls-player.component.html',
  styleUrl: './hls-player.component.scss'
})
export class HlsPlayerComponent {

  // variables
  @ViewChild('media', { static: true }) media!: ElementRef<HTMLVideoElement>;
  mHls!: Hls;

  mQualities: string[] = [];
  mSelectedQuality: number = -1; // -1 = auto

  @Input() data!: any;
  item:any

  mLastTap:number = 0;
  @Output() mVideoEnded = new EventEmitter<void>();

  // ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data?.id) {
      this.item = this.data
      // console.log(this.item)
      if (Hls.isSupported()) {
        this.mHls = new Hls();
        this.mHls.loadSource("https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8");
        // this.mHls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
        // this.mHls.loadSource(this.item.full_hls_master);
        this.mHls.attachMedia(this.media.nativeElement);
        this.mHls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
          this.mQualities = data.levels.map((level: any) => level.height + 'p');
          // AUTOPLAY
          this.media.nativeElement.play().catch((err: any) => {
            console.warn('Autoplay was blocked by browser:', err);
          });
        });

        // Detect_when_video_ends
        const video = this.media.nativeElement;
        video.addEventListener('ended', () => {
        // video.addEventListener('playing', () => {
          // call
          this.mVideoEnded.emit();
          // console.log('playing..')
        });

      }
      // else if (this.media.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      //   this.media.nativeElement.src = this.item.full_hls_master;
      //   // this.media.nativeElement.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
      //   // this.media.nativeElement.src ='http://localhost:8000/videos/335376e7-4afe-4759-a262-af27101af25a/master.m3u8';
      //   // this.media.nativeElement.src = 'http://localhost:8000//storage/videos/processed/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8';
      //   // // AUTOPLAY
      //   // this.media.nativeElement.play().catch((err: any) => {
      //   //   console.warn('Autoplay was blocked by browser:', err);
      //   // });

      // }
    }
  }

  // // ngOnInit
  // ngOnInit(): void {
  //   // Set
  //   this.item = this.data
  //   console.log(this.item)
  // }

  // // ngAfterViewInit
  // ngAfterViewInit(): void {
  //   if (Hls.isSupported()) {
  //     this.mHls = new Hls();
  //     // this.mHls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  //     // this.mHls.loadSource('http://localhost:8000//storage/videos/processed/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8');
  //     // this.mHls.loadSource(this.item.file);
  //     this.mHls.attachMedia(this.media.nativeElement);
  //     this.mHls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
  //       this.mQualities = data.levels.map((level: any) => level.height + 'p');
  //     });
  //   } else if (this.media.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
  //     this.media.nativeElement.src = this.item.file;
  //     // this.media.nativeElement.src = 'http://localhost:8000//storage/videos/processed/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8';
  //   }
  // }

  // setQuality
  setQuality(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const index = parseInt(selectElement.value, 10);
    if (this.mHls) {
      this.mHls.currentLevel = index; // -1 = auto
      this.mSelectedQuality = index;
    }
  }

  // onDoubleClick
  onDoubleClick(): void {
    this.toggleFullscreen();
  }

  // toggleFullscreen
  private toggleFullscreen(): void {
    const video = this.media.nativeElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  }

  // TabCounts
  onTouchEnd(event: TouchEvent): void {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.mLastTap;
    if (tapLength < 300 && tapLength > 0) {
      this.toggleFullscreen();
      event.preventDefault();
    }
    this.mLastTap = currentTime;
  }

}
