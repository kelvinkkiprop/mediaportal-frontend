import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { AppContextService } from '../../../../core/app-context.service';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-read',
  // imports: [],
  standalone: false,
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
})
export class ReadComponent {


  // variables
  mCurrentUser:any
  mInitials:any

  itemForm: any
  mProgress: boolean = false

  myMedia: any[] = []
  myPlaylists: any[] = []

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

  // onDelete
  onDelete(item:any){
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        cancelButton: 'btn btn-dark me-2',
        confirmButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    // Show
    // swal.fire({
    swalWithBootstrapButtons.fire({
      title: 'Remove?',
      text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete'
      // confirmButtonColor: '#e3342f',
      // cancelButtonColor: '#3490dc'
      }).then((result) => {
          //Delete
          if (result.isConfirmed) {
            this.mProgress = true
            this.mMediaService.deleteItem(item).subscribe({
              next: (response) => {
                if(response){
                  // console.log(response)
                  this.myMedia = this.myMedia.filter(items=>items.id !== item.id)
                  this.mToastrService.error((response as any).message)
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
      })
  }

}
