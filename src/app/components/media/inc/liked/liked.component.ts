import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../../core/app-context.service';
import { MediaService } from '../../../../services/media.service';

@Component({
  selector: 'app-liked',
  // imports: [],
  standalone: false,
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss'
})
export class LikedComponent {

  // variables
  mItems: any[] = []

  itemForm:any
  search_term:any

  mProgress:boolean = false
  links:any= []

  constructor(
    private mMediaService: MediaService,
    private mToastrService:ToastrService,
    public mContext:AppContextService,
  ) { }

  ngOnInit(): void {
    //Call
    this.index()

    //validation
    this.search_term = new FormControl('', Validators.required)
    this.itemForm = new FormGroup({
      search_term: this.search_term,
    })
  }

  // index
  index(){
    this.mProgress = true
    // console.log(formValues)
    this.mProgress = true
    this.mMediaService.likedMediaItems().subscribe({
      next: (response) => {
        if(response){
          this.mItems = (response as any).data
          // console.log(this.mItems)
          this.links = (response as any).links
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

  // onChangePage
  onChangePage(item:any){
    // console.log(item)
    this.mProgress = true
    this.mMediaService.paginateItems(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response)
          this.mItems =(response as any).data
          this.links = (response as any).links
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

}
