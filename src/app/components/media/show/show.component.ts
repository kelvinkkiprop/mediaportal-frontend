import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';
import { MediaService } from '../../../services/media.service';
// Add
import { RelatedComponent } from './inc/related/related.component';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'app-show',
  // imports: [],
  standalone: false,
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

  // variables
  id:any
  item:any = {}

  mCurrentUrl:any = ''
  mItem:any = ''
  mCreateIndex: number = 0;

  itemForm: any
  mEditIndex: number | null = null;
  mProgress: boolean = false

  @ViewChild('mRelatedComponent') mRelatedComponent!: RelatedComponent;

  mPlaylists:any [] = []
  mTypes:any = []

  constructor(
    private route: ActivatedRoute,
    private mMediaService: MediaService,
    private mPlaylistService: PlaylistService,
    private mToastrService: ToastrService,
    public mAppContextService: AppContextService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    // validation
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      type_id: ['', Validators.required],
      description: ['', Validators.nullValidator],
    });
    // call
    this.myPlaylists();
    this.index()
  }

  // ngOnInit
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.mProgress = true
    this.mMediaService.getOneItem(this.id).subscribe({
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

    this.mCurrentUrl = window.location.origin + this.router.url;
  }

  // index
  index(){
    this.mProgress = true
    this.mPlaylistService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mTypes = (response as any).data.types
          // this.myMediaPlaylists = (response as any).data.media_playlists
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

  // onVideoEnded
  onVideoEnded() {
    if (this.mRelatedComponent) {
      this.mRelatedComponent.playNextVideo();
    }
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
            this.mPlaylists = [(response as any).item, ...(this.mPlaylists ?? [])]
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

  // onShowCreate
  onShowCreate(){
    this.mCreateIndex = 1
  }
  // onCancelCreate
  onCancelCreate() {
    this.mCreateIndex = 0
  }


  // myPlaylists
  myPlaylists() {
    this.mProgress = true
    this.mPlaylistService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mPlaylists = (response as any).data.playlists
          // console.log(this.mPlaylists);
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
  isInList(id: any, list:any): any {
    // return " "+id+" "+list
    // console.log(" "+id+" "+list)
    return list?.some((item: { playlist_id: any; }) => item.playlist_id === id) ?? false;
  }

  // onSave
  onSave(mList: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Checked
      const item: any = {
        media_id: this.item.id,
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
        media_id: this.item.id,
        playlist_id: mList.id,
      };
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

}

