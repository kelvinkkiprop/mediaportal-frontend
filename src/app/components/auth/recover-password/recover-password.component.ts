import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
// import
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  standalone: false,
  selector: 'app-recover-password',
  // imports: [],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {

  // variables
  id:any

  // variables
  itemForm: any
  mProgress: boolean = false

  constructor(
    private mToastrService: ToastrService,
    public mAuthService: AuthService,
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
  ) {
    // validation
    this.itemForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    }, {
      validators: this.passwordValuesAreEqual('password', 'password_confirmation')
    });
  }

  // passwordValuesAreEqual
  private passwordValuesAreEqual(password: string, confirmPassword: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const formGroup = group as FormGroup;
      const pass = formGroup.get(password);
      const confirmPass = formGroup.get(confirmPassword);
      if (!pass || !confirmPass) {
        return null; // controls not yet initialized
      }
      if (confirmPass.errors && !confirmPass.errors['passwordsDoNotMatch']) {
        // return if another validator has already found an error on the confirmPass control
        return null;
      }
      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ passwordsDoNotMatch: true });
      } else {
        confirmPass.setErrors(null);
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  // onSubmit
  onSubmit(formValues: any){
      const item = {
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      id: this.id,
    };
    this.mProgress = true
    this.mAuthService.recoverPassword(item).subscribe({
      next: (response) => {
        console.log(response);
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
