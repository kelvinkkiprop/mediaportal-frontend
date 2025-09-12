import { Component } from '@angular/core';
// import
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-create',
  // imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  // variables
  itemForm: any
  mProgress: boolean = false

  constructor(
    private mToastrService: ToastrService,
    public mAuthService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // validation
    this.itemForm = this.fb.group({
      current_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
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

  // onSubmit
  onSubmit(formValues: any){
    this.mProgress = true
    this.mAuthService.changePassword(formValues).subscribe({
      next: (response) => {
        // console.log(response);
        if(response.status == 'success'){
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

