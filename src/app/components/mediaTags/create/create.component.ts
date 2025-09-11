import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaTagService } from '../../../services/media-tag.service';

@Component({
  selector: 'app-create',
  // imports: [],
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  // variables
  itemForm: any;
  mProgress: boolean = false;

  constructor(
    public mToastrService: ToastrService,
    public mMediaTagService: MediaTagService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // onSubmit
  onSubmit(formValues: any){
    // console.log(formValues);
    this.mProgress = true
    this.mMediaTagService.createItem(formValues).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/media-tags');
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

}
