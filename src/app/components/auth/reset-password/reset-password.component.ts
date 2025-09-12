import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Add
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  // imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  //variables
  email: any
  itemForm: any
  mProgress: boolean = false


  constructor(
    private mToastrService: ToastrService,
    public mAuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      email: ['', Validators.required],
    });

  }

  // onSubmit
  onSubmit(formValues: any){
    // console.log(formValues);
    this.mProgress = true
    this.mAuthService.resetPassword(formValues).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success(response.message);
          this.router.navigateByUrl('auth/login');
          this.mProgress = false;
        }else{
          this.mToastrService.error(response.message);
          this.mProgress = false;
        }
      },
      error: (error ) => {
        // console.log(error.error);
        if(error.error.message){
          this.mToastrService.error(error.error.message);
        }
        this.mProgress = false
      }
    });

  }

}
