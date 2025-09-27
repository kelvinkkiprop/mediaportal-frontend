import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { RelatedComponent } from '../show/inc/related/related.component';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from '../../../services/playlist.service';
import { AppContextService } from '../../../core/app-context.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-watch',
  // imports: [],
  standalone: false,
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss'
})
export class WatchComponent {

  // variables
  id:any
  item:any = {}

  // Default
  mCurrentUrl:any = ''
  mItem:any = ''
  mCreateIndex: number = 0;

  itemForm: any
  mEditIndex: number | null = null;
  mProgress: boolean = false

  mMyPlaylists:any [] = []
  mMyMediaPlaylists:any [] = []
  mTypes:any = []

  @ViewChild('mRelatedComponent') mRelatedComponent!: RelatedComponent;
  mVideoId!: string
  mVideo!: string


  // Playlist
  mPlaylistId!: string | null
  mPlaylist: any
  mMediaPlaylist: any = []
  mCurrentMediaPlaylistIndex: number = 0

  // Playlist
  mCategoryId!: string | null
  mCategory: any
  mCategorylist: any = []
  mCurrentCategorylistIndex: number = 0

  // Playlist
  mEntityId!: string | null
  mEntity: any
  mEntitylist: any = []
  mCurrentEntitylistIndex: number = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mMediaService: MediaService,
    private mToastrService: ToastrService,
    private mPlaylistService: PlaylistService,
    public mAppContextService: AppContextService,
    private fb: FormBuilder,
  ) {
    // validation
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      type_id: ['', Validators.required],
      description: ['', Validators.nullValidator],
    });
    // call
    this.myMediaPlaylists();
    this.index()
    // set
    this.mCurrentUrl = window.location.origin + this.router.url;
  }

  // ngOnInit
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mVideoId = params.get('video')!;
      this.mPlaylistId = params.get('playlist');
      this.mCategoryId = params.get('category');
      this.mEntityId = params.get('entity');

      if (this.mPlaylistId) {
        // Load_playlist_first_video_when_playlist_is_ready
        this.loadPlaylistMediaAndIndex(() => {
          if (this.mVideoId) {
            this.loadVideo(this.mVideoId);
          }
        });
      }else if (this.mCategoryId) {
        // Load_categoryMedia_first_video_when_categoryMedia_is_ready
        this.loadCategoryMediaAndIndex(() => {
          if (this.mVideoId) {
            this.loadVideo(this.mVideoId);
          }
        });
      }else if (this.mEntityId) {
        // Load_entityMedia_first_video_when_categoryMedia_is_ready
        this.loadEntityMediaAndIndex(() => {
          if (this.mVideoId) {
            this.loadVideo(this.mVideoId);
          }
        });
      } else if (this.mVideoId) {
        // No playlist, just load single video
        this.loadVideo(this.mVideoId);
      }
    });
  }



// ===============================================DEFAULT===============================================
  // loadVideo
  loadVideo(id:any): void {
    this.mProgress = true
    this.mMediaService.getOneItem(id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // console.log(this.item)
          this.mItem = this.item
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error);
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    });
  }

  // toggleReact
  toggleReact(formValues: any, type_id:any): void {
    const item: any = {
      id: formValues.id,
      type_id: type_id,
    }
    // this.mProgress = true
    this.mMediaService.reactItem(item).subscribe({
      next: (response) => {
        if(response){
          if((response as any).status === 'success'){
            // call
            if(type_id==1){
              this.mToastrService.success((response as any).message);
            }else{
              this.mToastrService.error((response as any).message);
            }
            this.mItem = (response as any).data
          }
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error)
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    })
  }

  // copyUrl
  copyUrl() {
    navigator.clipboard.writeText(this.mCurrentUrl).then(() => {
      this.mToastrService.success('Link copied to clipboard!');
    });
  }

  // onSubmit
  onSubmit(formValues: any){
    const item: any = {
      name: formValues.name,
      type_id: formValues.type_id,
      description: formValues.description,
    };
    this.mProgress = true
    this.mPlaylistService.createItem(item).subscribe({
    next: (response) => {
      if(response){
        if((response as any).status === 'success'){
            this.mMyPlaylists = [(response as any).item, ...(this.mMyPlaylists ?? [])]
            this.itemForm.reset()
            this.onCancelCreate()
            this.mToastrService.success((response as any).message)
          }
          this.mProgress = false
        }
      },
      error: (error ) => {
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    })
  }

  // index
  index(){
    this.mProgress = true
    this.mMediaService.unpaginatedItems().subscribe({
      next: (response) => {
        // console.log(response)
        if(response){
          this.mTypes = (response as any).data.media_types
          this.mMyMediaPlaylists = (response as any).data.media_playlists,
          this.mProgress = false
        }
      },
      error: (error ) => {
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    });
  }

  // onShowCreate
  onShowCreate(){
    this.mCreateIndex = 1
  }
  // onCancelCreate
  onCancelCreate() {
    this.mCreateIndex = 0
  }

  // myMediaPlaylists
  myMediaPlaylists() {
    this.mProgress = true
    this.mPlaylistService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mMyPlaylists = (response as any).data.playlists
          // console.log(this.mMyPlaylists);
          this.mProgress = false
        }
      },
      error: (error ) => {
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    });
  }

  // isInList
  // isInList(item: any, list:any[]): any {
  //   if (!list) return false;
  //   return list?.some((mItem: { id: any; }) => mItem.media_id === item.id);
  // }

  // isInList
  isInList(id: any, list:any): any {
    if (!id || !list) return false;
    // console.log(" "+item+" "+list)
    return list?.some((item: { playlist_id: any; }) => item.playlist_id === id) ?? false;
  }


  // onSave
  onSave(mList: any, event: Event) {
    event.preventDefault();
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Checked
      const item: any = {
        media_id: this.mVideoId,
        playlist_id: mList.id,
      };
      this.mProgress = true
      this.mPlaylistService.addItem(item).subscribe({
      next: (response) => {
        if(response){
          if((response as any).status === 'success'){
              this.mToastrService.success((response as any).message)
            }
            this.mProgress = false
          }
        },
        error: (error ) => {
          if(error.error.message){
            this.mToastrService.error(error.error.message)
          }
          this.mProgress = false
        }
      })

    } else {
      // Unchecked
      const item: any = {
        media_id: this.mVideoId,
        playlist_id: mList.id,
      };
      // console.log(item)
      this.mProgress = true
      this.mPlaylistService.removeItem(item).subscribe({
      next: (response) => {
        if(response){
          if((response as any).status === 'success'){
              this.mToastrService.error((response as any).message)
            }
            this.mProgress = false
          }
        },
        error: (error ) => {
          if(error.error.message){
            this.mToastrService.error(error.error.message)
          }
          this.mProgress = false
        }
      })

    }
  }

  // onVideoEnded
  onVideoEnded() {
    // Playlist
    if (this.mPlaylistId && this.mCurrentMediaPlaylistIndex < this.mMediaPlaylist.length - 1) {
      this.mCurrentMediaPlaylistIndex++;
      const nextItem = this.mMediaPlaylist[this.mCurrentMediaPlaylistIndex];
      this.mVideoId = nextItem.media.id;

      // console.log('Next item:', nextItem);
      // console.log('Playlist ID:', this.mPlaylistId);

      this.router.navigate(['/media/watch'], {
        queryParams: {
          video: this.mVideoId,
          playlist: this.mPlaylistId
        }
      });
    }
    // OneVideo
    else if (this.mVideoId && this.mRelatedComponent) {
      this.mRelatedComponent.playNextVideo();
    }
  }
  // ===============================================./DEFAULT===============================================






  // ===============================================PLAYLIST===============================================
  // loadPlaylistMediaAndIndex
  loadPlaylistMediaAndIndex(callback?: () => void) {
    this.mProgress = true;
    this.mMediaService.playlistMediaItem(this.mPlaylistId!).subscribe({
      next: (response) => {
        // set
        this.mPlaylist = response
        this.mMediaPlaylist = (response as any).media_playlist;
        // console.log(this.mMediaPlaylist)

        this.mCurrentMediaPlaylistIndex = this.mMediaPlaylist.findIndex(
          (item: any) => item.media.id === this.mVideoId
        );

        if (this.mCurrentMediaPlaylistIndex === -1 && this.mMediaPlaylist.length > 0) {
          this.mCurrentMediaPlaylistIndex = 0;
          this.mVideoId = this.mMediaPlaylist[0].media.id;
        }

        this.mProgress = false;
        // Load_video_after_playlist_is_ready
        if (callback) callback();
      },
      error: (error) => {
        if (error.error?.message) {
          this.mToastrService.error(error.error.message);
        }
        this.mProgress = false;
      }
    });
  }
  // ===============================================./PLAYLIST===============================================



  // ===============================================CATEGORY_MEDIA===============================================
  // loadCategoryMediaAndIndex
  loadCategoryMediaAndIndex(callback?: () => void) {
    this.mProgress = true;
    this.mMediaService.categoryMediaItem(this.mCategoryId!).subscribe({
      next: (response) => {
        // set
        // console.log(response)
        this.mCategory = response
        this.mCategorylist = (response as any).media_category;

        this.mCurrentCategorylistIndex = this.mCategorylist.findIndex(
          (item: any) => item.media.id === this.mVideoId
        );

        if (this.mCurrentCategorylistIndex === -1 && this.mCategorylist.length > 0) {
          this.mCurrentCategorylistIndex = 0;
          this.mVideoId = this.mCategorylist[0].media.id;
        }

        this.mProgress = false;
        // Load_video_after_playlist_is_ready
        if (callback) callback();
      },
      error: (error) => {
        if (error.error?.message) {
          this.mToastrService.error(error.error.message);
        }
        this.mProgress = false;
      }
    });
  }
  // ===============================================./CATEGORY_MEDIA===============================================



  // ===============================================ENTITY_MEDIA===============================================
  // loadEntityMediaAndIndex
  loadEntityMediaAndIndex(callback?: () => void) {
    this.mProgress = true;
    this.mMediaService.entityMediaItem(this.mEntityId!).subscribe({
      next: (response) => {
        // set
        this.mEntity = response
        this.mEntitylist = (response as any).media
        console.log(this.mEntitylist)

        this.mCurrentEntitylistIndex = this.mEntitylist.findIndex(
          (item: any) => item.id === this.mVideoId
        );

        if (this.mCurrentEntitylistIndex === -1 && this.mEntitylist.length > 0) {
          this.mCurrentEntitylistIndex = 0;
          this.mVideoId = this.mEntitylist[0].id;
        }

        this.mProgress = false;
        // Load_video_after_playlist_is_ready
        if (callback) callback();
      },
      error: (error) => {
        if (error.error?.message) {
          this.mToastrService.error(error.error.message);
        }
        this.mProgress = false;
      }
    });
  }
  // ===============================================./ENTITY_MEDIA===============================================


}
