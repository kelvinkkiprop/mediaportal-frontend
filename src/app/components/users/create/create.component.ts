import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-create',
  // imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  // variables
  itemForm: any;
  mProgress: boolean = false;

  mAccountTypes:any
  mInstitutionCategories:any
  mInstitutions:any
  mRoles:any

  constructor(
    public mToastrService: ToastrService,
    public mUserService: UserService,
    public mAppContextService: AppContextService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      account_type_id: ['', Validators.required],
      first_name: ['', Validators.nullValidator],
      last_name: ['', Validators.nullValidator],
      name: ['', Validators.nullValidator],
      alias: ['', Validators.nullValidator],
      institution_category_id: ['', Validators.nullValidator],
      institution_id: ['', Validators.nullValidator],
      role_id: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // call
    this.index()
  }

  // onSubmit
  onSubmit(formValues: any){
    // console.log(formValues);
    this.mProgress = true
    this.mUserService.createItem(formValues).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/users');
          this.mProgress = false;
        }else{
          this.mToastrService.error((response as any).message);
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

  // index
  index(){
    this.mProgress = true
    this.mUserService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mAccountTypes = (response as any).data.account_types
          this.mInstitutionCategories = (response as any).data.institution_categories
          this.mInstitutions = (response as any).data.institutions
          this.mRoles = (response as any).data.roles
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
