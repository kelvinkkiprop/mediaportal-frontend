import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { catchError, debounceTime, first, map, Observable, of, switchMap } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-register',
  // imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // variables
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
      email: ['', [Validators.nullValidator, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  // onSubmit
  onSubmit(formValues: any){
    // // console.log(formValues);
    this.mProgress = true
    this.mAuthService.register(formValues).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success(response.message);
          this.router.navigateByUrl('/auth/login');
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


