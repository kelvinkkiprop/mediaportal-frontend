import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../core/app-context.service';
import { User } from '../../../interfaces/user';
import { LiveStreamService } from '../../../services/live-stream.service';

@Component({
  selector: 'app-edit',
  // imports: [],
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {


  // variables
  itemForm:any;
  mProgress:boolean = false;

  mRoles:any
  mStatuses:any

  id:any
  item:User = {}

  constructor(
    private route: ActivatedRoute,
    private mLiveStreamService: LiveStreamService,
    private router: Router,
    private mToastrService: ToastrService,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    this.mLiveStreamService.getOneItem(this.id).subscribe({
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
    this.mLiveStreamService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
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
    // const item: User = {
    const item: any = {
      id: this.id,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      role_id: formValues.role_id,
      status_id: formValues.status_id,
      password: formValues.password,
      reset_password: formValues.reset_password,
    }
    this.mProgress = true
    this.mLiveStreamService.updateItem(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/live-stream');
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

