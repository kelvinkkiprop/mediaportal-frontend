import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import * as shaka from 'shaka-player';
import 'shaka-player/dist/shaka-player.compiled';
declare const shaka: any;

@Component({
  selector: 'app-shaka-player',
  imports: [],
  templateUrl: './shaka-player.component.html',
  styleUrl: './shaka-player.component.scss'
})
export class ShakaPlayerComponent implements OnInit, OnDestroy {

  // variables
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  player!: shaka.Player;

  ngOnInit() {
    this.initPlayer();
  }

  async initPlayer() {
    // Install shaka polyfills
    shaka.polyfill.installAll();
    if (!shaka.Player.isBrowserSupported()) {
      console.error('Browser not supported!');
      return;
    }

    this.player = new shaka.Player(this.videoElement.nativeElement);
    // Listen for error events.
    this.player.addEventListener('error', this.onErrorEvent);

    try {
      // Replace with your HLS or DASH stream URL
      await this.player.load('https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd');
      // await this.player.load('https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8');
      console.log('The video has now been loaded!');
    } catch (error) {
      this.onError(error);
    }
  }

  onErrorEvent = (event: any) => {
    this.onError(event.detail);
  };

  onError(error: any) {
    console.error('Error code', error.code, 'object', error);
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }
}
