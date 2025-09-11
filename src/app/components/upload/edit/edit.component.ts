import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

}



// import { Component, HostListener } from '@angular/core';
// import { lastValueFrom } from 'rxjs';
// import { UploadService } from '../../../services/upload.service';
// // import
// import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-create',
//   // imports: [],
//   standalone: false,
//   templateUrl: './create.component.html',
//   styleUrl: './create.component.scss'
// })
// export class CreateComponent {

//   // variables
//   itemForm: any
//   mProgress: boolean = false

//   // mCourses:any
//   // mInstructors:any

//   mSelectedFile: any | null = null;
//   progress = 0;
//   isDragging = false;

//   constructor(
//     public mToastrService: ToastrService,
//     public mUploadService: UploadService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {
//     // validation
//     this.itemForm = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//     });
//   }


//   ngOnInit(): void {
//     // call
//     // this.index()
//   }

//   // // onSubmit
//   // onSubmit(formValues: any){
//   //   let formData:any = new FormData()
//   //   formData.append('course_id', formValues.course_id);
//   //   formData.append('name', formValues.name);
//   //   formData.append('description', formValues.description);
//   //   formData.append('video', this.mFile, this.mFile.name);
//   //   formData.append('instructor_id', formValues.instructor_id);

//   //   this.mProgress = true
//   //   // this.mUploadService.createItem(formValues).subscribe({
//   //   this.mUploadService.createItem(formData).subscribe({
//   //     next: (response) => {
//   //       // console.log(response.status);
//   //       if(response.status === 'success'){
//   //         this.mToastrService.success((response as any).message);
//   //         this.router.navigateByUrl('/course-modules');
//   //         this.mProgress = false;
//   //       }else{
//   //         this.mToastrService.error((response as any).message);
//   //         this.mProgress = false;
//   //       }
//   //     },
//   //     error: (error ) => {
//   //       // console.log(error.error);
//   //       if(error.error.message){
//   //         this.mToastrService.error(error.error.message);
//   //       }
//   //       this.mProgress = false
//   //     }
//   //   });

//   // }

//   // // index
//   // index(){
//   //   this.mProgress = true
//   //   this.mUploadService.unpaginatedItems().subscribe({
//   //     next: (response) => {
//   //       if(response){
//   //         this.mCourses = (response as any).data.courses
//   //         this.mInstructors = (response as any).data.instructors
//   //         this.mProgress = false
//   //       }
//   //     },
//   //     error: (error ) => {
//   //       // console.log(error);
//   //       if(error.error.message){
//   //         this.mToastrService.error(error.error.message)
//   //       }
//   //       this.mProgress = false
//   //     }
//   //   });
//   // }


//   // onFileSelected
//   onFileSelected(event: any) {
//     this.mSelectedFile = event.target.files[0];
//   }


//   @HostListener('dragover', ['$event']) onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
//   @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent) { e.preventDefault(); this.isDragging = false; }
//   @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
//     e.preventDefault();
//     this.isDragging = false;
//     if (e.dataTransfer?.files.length) {
//       this.mSelectedFile = e.dataTransfer.files[0];
//     }
//   }

//   async upload() {
//     if (!this.mSelectedFile) return;
//       const chunkSize = 5 * 1024 * 1024;
//       const totalChunks = Math.ceil(this.mSelectedFile.size / chunkSize);
//       const initRes = await lastValueFrom(this.mUploadService.initUpload(this.mSelectedFile.name, this.itemForm.get('title')));
//       const uploadId = initRes.uploadId;

//     for (let i = 0; i < totalChunks; i++) {
//       const start = i * chunkSize;
//       const end = Math.min(start + chunkSize, this.mSelectedFile.size);
//       const chunk = this.mSelectedFile.slice(start, end);

//       await lastValueFrom(this.mUploadService.uploadChunk(uploadId, i, chunk).pipe(
//         // update progress during chunk transfer
//       ));
//       this.progress = Math.round(((i + 1) / totalChunks) * 100);
//     }

//     await lastValueFrom(this.mUploadService.completeUpload(uploadId, totalChunks, this.itemForm.get('title'), this.itemForm.get('description')));
//     // alert('Upload complete!');
//     this.mToastrService.success("Upload complete")
//   }


// }
