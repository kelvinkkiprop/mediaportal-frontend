import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';
import { AuthService } from '../../../services/auth.service';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-edit',
  // imports: [],
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  // variables
  mCurrentUser:any
  mInitials:any

  itemForm: any
  mProgress: boolean = false

  myMedia:any
  myPlaylists:any

  constructor(
    public mAuthService: AuthService,
    public mAppContextService: AppContextService,
    public mMediaService: MediaService,
    public mToastrService: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.mCurrentUser = this.mAuthService.currentUser;
    this.mInitials = this.mCurrentUser.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
    // call
    this.index(this.mCurrentUser.id)
  }

  // index
  index(id:any){
    this.mProgress = true
    this.mMediaService.myMedia(id).subscribe({
      next: (response) => {
        if(response){
          this.myMedia = (response as any).data.my_media
          this.myPlaylists = (response as any).data.my_playlists
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

}
