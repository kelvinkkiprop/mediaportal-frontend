import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LiveStreamService } from '../../../services/live-stream.service';


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

  mThumbnailPreviewFile: any;
  mThumbnailFile: any;

  constructor(
    public mToastrService: ToastrService,
    public mLiveStreamService: LiveStreamService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      scheduled_at: ['', Validators.required],
      thumbnail: ['', Validators.required],
      live_stream_link: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // call
  }

  // onSubmit
  onSubmit(formValues: any){
let formData:any = new FormData()
    formData.append('title', formValues.title)
    formData.append('description', formValues.description)
    formData.append('scheduled_at', formValues.scheduled_at)
    formData.append('live_stream_link', formValues.live_stream_link)
    // attachments
    formData.append('thumbnail', this.mThumbnailFile, this.mThumbnailFile?.name)
    formData.append('_method', 'POST');
    // console.log([...formData.entries()])

    this.mProgress = true
    this.mLiveStreamService.createItem(formData).subscribe({
      next: (response) => {
        // console.log(response.status);
        if(response.status === 'success'){
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/live-stream');
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

  // onThumbnailChange
  onThumbnailChange(event:any) {
    if (event.target.value) {
      const file = event.target.files[0];
      this.mThumbnailFile = file;

      // Generate_preview
      const reader = new FileReader();
      reader.onload = () => (this.mThumbnailPreviewFile = reader.result); //base64
      reader.readAsDataURL(file);
    }
  }

}
