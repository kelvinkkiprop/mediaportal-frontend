import { Component } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  // imports: [],
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  mFile: any;

  // variables
  itemForm: any
  mProgress: boolean = false

  constructor(
    private mUploadService: UploadService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      video: ['', Validators.required],
    });
  }

  // onSubmit
  onSubmit(formValues: any){
    let formData:any = new FormData()
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('file', this.mFile, this.mFile.title);

    // this.mProgress = true
    // this.mCourseModuleService.createItem(formValues).subscribe({
    this.mUploadService.createItem(formData).subscribe({
      next: (response) => {
        console.log(response);
        // if(response.status === 'success'){
        //   this.mToastrService.success((response as any).message);
        //   this.router.navigateByUrl('/course-modules');
        //   this.mProgress = false;
        // }else{
        //   this.mToastrService.error((response as any).message);
        //   this.mProgress = false;
        // }
      },
      error: (error ) => {
        // console.log(error.error);
        // if(error.error.message){
        //   this.mToastrService.error(error.error.message);
        // }
        // this.mProgress = false
      }
    });

  }

  // onFileChange
  onFileChange(event:any) {
    if (event.target.value) {
      const file = event.target.files[0];
      console.log(file);
      if(file.size > 100e+6){//100MB
        // this.mToastrService.error("File size is greater than 100MB");
        this.mFile = '';
        return;
      }
      this.mFile = file;
      // console.log(this.mFile);
    }
  }


}
