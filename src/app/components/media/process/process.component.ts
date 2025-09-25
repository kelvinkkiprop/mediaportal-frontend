import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Media } from '../../../interfaces/media';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-process',
  // imports: [],
  standalone: false,
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent {


  // variables
  mStatus: any

  itemForm: any
  mProgress: boolean = false

  id:any
  item:Media = {}


  constructor(
    public mToastrService: ToastrService,
    public mMediaService: MediaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // validation
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      status_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mMediaService.getOneItem(this.id).subscribe({
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
    this.mMediaService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mStatus = (response as any).data.approval_status
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
    const item: any = {
      id: this.id,
      title: formValues.title,
      status_id: formValues.status_id,
    }

    this.mProgress = true
    this.mMediaService.processItem(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/media');
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

