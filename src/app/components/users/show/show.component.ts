import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-show',
  // imports: [],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

  // variables
  mCurrentUser:any
  id:any

  item:any
  mProgress: boolean = false

  showPlaylist = false;

  constructor(
    public mAuthService: AuthService,
    public mAppContextService: AppContextService,
    public mUserService: UserService,
    public mToastrService: ToastrService,
    public route: ActivatedRoute
  ) {

  }

  // ngOnInit
  ngOnInit() {
    // set
    this.mCurrentUser = this.mAuthService.currentUser;
    this.id = this.route.snapshot.paramMap.get('id')

    this.mProgress = true
    this.mUserService.getOneItem(this.id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          setTimeout(() => this.showPlaylist = true);
          // console.log(response)
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

}
