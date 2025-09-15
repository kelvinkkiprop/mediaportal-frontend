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

  mRoles:any
  mOrganizationCategories:any
  mOrganizations:any

  constructor(
    public mToastrService: ToastrService,
    public mUserService: UserService,
    public mAppContextService: AppContextService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role_id: ['', Validators.required],
      organization_category_id: ['', Validators.nullValidator],
      organization_id: ['', Validators.nullValidator],
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
          this.mRoles = (response as any).data.roles
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

}
