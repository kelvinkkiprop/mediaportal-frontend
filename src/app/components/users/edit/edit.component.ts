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

  mRoles:any
  mStatuses:any
  mOrganizationCategories:any
  mOrganizations:any

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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role_id: ['', Validators.required],
      status_id: ['', Validators.required],
      organization_category_id: ['', Validators.nullValidator],
      organization_id: ['', Validators.nullValidator],
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
          this.mRoles = (response as any).data.roles
          this.mStatuses = (response as any).data.statuses
          this.mOrganizationCategories = (response as any).data.organization_categories
          this.mOrganizations = (response as any).data.organizations
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

  // onOrganizationChange
  onOrganizationChange($event: any){
    let id = $event.value
    this.filterConstituencies(id)
    this.mOrganizations = []//Reset
  }
  // filterConstituencies
  filterConstituencies(id:any){
    this.mProgress = true
    this.mUserService.filterOrganizations(id).subscribe({
      next: (response) => {
        if(response){
          // console.log(response)
          //set
          this.mOrganizations = response
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error.error)
        this.mToastrService.error(error.error.message)
        this.mProgress = false
      }
    })
  }

  // onSubmit
  onSubmit(formValues: any){
    // const item: User = {
    const item: any = {
      id: this.id,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      role_id: formValues.role_id,
      status_id: formValues.status_id,
      organization_category_id: formValues.organization_category_id,
      organization_id: formValues.organization_id,
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
