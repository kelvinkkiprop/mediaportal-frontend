import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-edit',
  // imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  // variables
  itemForm:any;
  mProgress:boolean = false;

  mAccountTypes:any
  mInstitutionCategories:any
  mInstitutions:any
  mRoles:any
  mStatuses:any

  id:any
  item:User = {}

  constructor(
    private route: ActivatedRoute,
    private mUserService: UserService,
    private router: Router,
    private mToastrService: ToastrService,
    private mAppContextService: AppContextService,
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
      status_id: ['', Validators.required],
      password: ['', [Validators.nullValidator, Validators.minLength(6)]],
      reset_password: [false, Validators.nullValidator],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mUserService.getOneItem(this.id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // console.log(response)
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

    // call
    this.index()
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
          this.mStatuses = (response as any).data.statuses
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

  // onSubmit
  onSubmit(formValues: any){
    const item: User = {
      id: this.id,
      email: formValues.email,
      account_type_id: formValues.account_type_id,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      name: formValues.name,
      alias: formValues.alias,
      institution_category_id: formValues.institution_category_id,
      institution_id: formValues.institution_id,
      role_id: formValues.role_id,
      status_id: formValues.status_id,
      password: formValues.password,
      reset_password: formValues.reset_password,
    }
    this.mProgress = true
    this.mUserService.updateItem(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/users');
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
