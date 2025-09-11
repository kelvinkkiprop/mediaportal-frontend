// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';
// import { UploadService } from '../../services/upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { UploadService } from '../../../services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  // imports: [],
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  // variables
  selectedFile: any | null = null;
  // title:any = '';
  // description = '';
  progress = 0;
  isDragging = false;

  // variables
  itemForm: any
  mProgress: boolean = false

  constructor(
    public mToastrService: ToastrService,
    public mUploadService: UploadService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    // validation
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

   // onSubmit
  onSubmit(formValues: any){
    // console.log(formValues);
    this.upload(formValues.title, formValues.description);
  }

  // drag
  @HostListener('dragover', ['$event']) onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
  @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent) { e.preventDefault(); this.isDragging = false; }
  @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer?.files.length) {
      this.selectedFile = e.dataTransfer.files[0];
    }
  }

  // onFileSelected
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile)
  }

  // upload
  async upload(title:any, description:any) {
    // if (!this.selectedFile || this.itemForm.invalid) return;
    if (!this.selectedFile || this.itemForm.invalid) {
      this.mToastrService.warning('Please fill out all fields and select a file.');
      return;
    }

    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(this.selectedFile.size / chunkSize);

    const initRes = await lastValueFrom(this.mUploadService.initUpload(this.selectedFile.name, title));
    const uploadId = initRes.uploadId;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, this.selectedFile.size);
      const chunk = this.selectedFile.slice(start, end);

      await lastValueFrom(this.mUploadService.uploadChunk(uploadId, i, chunk).pipe(
        // update progress during chunk transfer
      ));

      this.progress = Math.round(((i + 1) / totalChunks) * 100);
    }

    await lastValueFrom(this.mUploadService.completeUpload(uploadId, totalChunks, title, description));
    // alert('Upload complete!');
    this.mToastrService.success('Upload complete!')
    // this.router.navigateByUrl('/my-media');
  }

}
