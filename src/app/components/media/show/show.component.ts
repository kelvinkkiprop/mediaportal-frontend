import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../../services/media.service';
import { AppContextService } from '../../../core/app-context.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-show',
  // imports: [],
  standalone: false,
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

  // variables
  id:any
  item:any = {}

  mCurrentUrl:any = ''
  mItem:any = ''
  mComments:any = ''

  itemForm: any
  mProgress: boolean = false

  constructor(
    private route: ActivatedRoute,
    private mMediaService: MediaService,
    private mToastrService: ToastrService,
    public mContext: AppContextService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    // validation
    this.itemForm = this.fb.group({
      text: ['', Validators.required],
    });

   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
        this.index(id);
        this.id = params.get('id');
      }
    });
    this.mCurrentUrl = window.location.origin + this.router.url;
  }

  // index
  index(id:any){
    this.mProgress = true
    this.mMediaService.getOneItem(id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // console.log(this.item)
          this.mItem = this.item
          this.mComments = this.item.comments
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

  // toggleReact
  toggleReact(formValues: any, type_id:any): void {
    const item: any = {
      id: formValues.id,
      type_id: type_id,
    }
    // this.mProgress = true
    this.mMediaService.reactItem(item).subscribe({
      next: (response) => {
        if(response){
          if((response as any).status === 'success'){
            // // call
            // this.index(this.id)
            // if(type_id==1){
            //   this.mToastrService.success((response as any).message);
            // }else{
            //   this.mToastrService.error((response as any).message);
            // }
            // console.log(response)
            this.mItem = (response as any).data
          }
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error)
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    })
  }

  // copyUrl
  copyUrl() {
    navigator.clipboard.writeText(this.mCurrentUrl).then(() => {
      this.mToastrService.success('Link copied to clipboard!');
    });
  }

  // onSubmit
  onSubmit(formValues: any){
    const item: any = {
      id: this.item.id,
      text: formValues.text,
    };
    // this.mProgress = true
    this.mMediaService.commentItem(item).subscribe({
    next: (response) => {
      if(response){
        if((response as any).status === 'success'){
            // console.log(response)
            this.mComments = (response as any).data.comments
            this.mItem = (response as any).data
            this.itemForm.reset()
            this.mToastrService.success((response as any).message)
          }
          // this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error)
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        // this.mProgress = false
      }
    })
  }

}
