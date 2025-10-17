import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../services/profile.service';

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
  mInitials:any

  itemForm: any
  mProgress: boolean = false

  constructor(
    public mAuthService: AuthService,
    private mProfileService: ProfileService,
    private mToastrService: ToastrService,
    private fb: FormBuilder,
  ) {
    // validation
    this.itemForm = this.fb.group({
      receive_notifications: [false, Validators.nullValidator],
    });
  }


  ngOnInit(): void {
    this.mCurrentUser = this.mAuthService.currentUser;
    this.mInitials = this.mCurrentUser.full_name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
  }

  // onSubmit
  onSubmit(formValues: any){
    // const item: User = {
    const item: any = {
      user_id: this.mCurrentUser.id,
      receive_notifications: formValues.receive_notifications,
    }
    this.mProgress = true
    this.mProfileService.updateNotifications(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mAuthService.saveUserLocally(response)
          this.mToastrService.success((response as any).message);
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error);
        if(error.error.message){
          this.mToastrService.error(error.error.message);
        }
        this.mProgress = false
      }
    });

  }

}
