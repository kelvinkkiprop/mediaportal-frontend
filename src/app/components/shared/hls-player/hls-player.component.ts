// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Input, OnInit, SimpleChanges } from '@angular/core';
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

  // ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data?.id) {
      this.item = this.data
      // console.log(this.item)
      if (Hls.isSupported()) {
        this.mHls = new Hls();
        this.mHls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        // this.mHls.loadSource('http://localhost:8000//storage/videos/processed/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8');
        // this.mHls.loadSource(this.item.file);
        // this.mHls.loadSource('http://localhost:8000/videos/335376e7-4afe-4759-a262-af27101af25a/master.m3u8');
        // this.mHls.loadSource(this.item.full_hls_master);
        this.mHls.attachMedia(this.media.nativeElement);
        this.mHls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
          this.mQualities = data.levels.map((level: any) => level.height + 'p');
        });
      } else if (this.media.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
        // this.media.nativeElement.src = this.item.full_hls_master;
        this.media.nativeElement.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
        // this.media.nativeElement.src ='http://localhost:8000/videos/335376e7-4afe-4759-a262-af27101af25a/master.m3u8';
        // this.media.nativeElement.src = 'http://localhost:8000//storage/videos/processed/d050b5ce-dc6f-4646-a8bc-fddd6646a37f/master.m3u8';
      }
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

}
