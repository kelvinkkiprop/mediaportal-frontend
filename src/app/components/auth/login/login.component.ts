import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';

@Component({
  standalone: false,
  selector: 'app-login',
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // variables
  itemForm: any;
  mProgress: boolean = false;

  constructor(
    public mToastrService: ToastrService,
    public mAuthService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private mAppContextService: AppContextService,
  ) {
    // validation
    this.itemForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // onSubmit
  async onSubmit(formValues: any){
    // const item: User = {
    const item: any = {
      email: formValues.email,
      password: formValues.password,
      device_type_id: this.mAppContextService.getDeviceType(),
      ip_address: await this.mAppContextService.getPublicIpAddress(),
    }


    this.mProgress = true
    this.mAuthService.login(item).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success(response.message);
          this.router.navigateByUrl('/dashboard');
          // window.location.assign('/dashboard');
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
