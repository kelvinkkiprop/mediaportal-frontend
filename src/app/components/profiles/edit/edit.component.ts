import { Component } from '@angular/core';
// import
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { catchError, debounceTime, first, map, Observable, of, switchMap } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';

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

  mClassLevels:any
  mWards:any
  mInterests:any
  mSubjects:any = []
  mCounties:any = []
  mConstituencies:any = []

  id:any
  item:User = {}

  constructor(
    private route: ActivatedRoute,
    private mProfileService: ProfileService,
    private mAuthService: AuthService,
    private router: Router,
    private mToastrService: ToastrService,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      phone: ['', Validators.required],
      county_id: ['', Validators.required],
      constituency_id: ['', Validators.required],
      ward_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mProfileService.getOneItem(this.id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // alert(this.item)
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
    this.mProfileService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mCounties = (response as any).data.counties
          this.mConstituencies = (response as any).data.constituencies
          this.mWards = (response as any).data.wards
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
    // const item: User = {
    const item: any = {
      id: this.id,
      phone: formValues.phone,
      county_id: formValues.county_id,
      constituency_id: formValues.constituency_id,
      ward_id: formValues.ward_id,
    }
    this.mProgress = true
    this.mProfileService.updateItem(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mToastrService.info((response as any).message);
          this.router.navigateByUrl('/profile');
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

  //  onCountyChange
  onCountyChange($event: any){
    let id = $event.value
    this.filterConstituencies(id)
    this.mConstituencies = []//Reset
    this.mWards = []//Reset
  }
  // filterConstituencies
  filterConstituencies(id:any){
    this.mProgress = true
    this.mProfileService.filterConstituencies(id).subscribe({
      next: (response) => {
        if(response){
          // console.log(response)
          //set
          this.mConstituencies = response
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

  // onConstituencyChange
  onConstituencyChange($event: any){
    let id = $event.value
    this.filterWards(id)
    this.mWards = []//Reset
  }
  // filterWards
  filterWards(id:any){
    let constituency_id = this.itemForm.get('constituency_id').value;
    // console.log(constituency_id)
    this.mProgress = true
    this.mProfileService.filterWards(id, constituency_id).subscribe({
      next: (response) => {
        if(response){
          // console.log(response)
          //set
          this.mWards = response
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error.error)
        // this.mToastrService.error(error.error.message)
        this.mProgress = false
      }
    })
  }


}

