import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-verify',
  // imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {

  // variables
  itemForm: any
  mProgress: boolean = false
  mCurrentUser: any

  constructor(
    public mToastrService: ToastrService,
    public mAuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      verification_code: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mCurrentUser = this.mAuthService.currentUser
  }

  // onSubmit
  onSubmit(formValues: any){
    // // console.log(formValues);
    this.mProgress = true
    this.mAuthService.verifyEmail(formValues).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success(response.message);
          this.router.navigateByUrl('/dashboard');
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

  // resendCode
  resendCode(){
    // console.log(formValues);
    this.mProgress = true
    this.mAuthService.resendVerificationCode().subscribe({
      next: (response) => {
        if(response.status === 'success'){
          this.mToastrService.success(response.message);
          this.mProgress = false;
        }else{
          this.mToastrService.error(response.message);
          this.mProgress = false;
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

