import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { MediaTagService } from '../../../services/media-tag.service';

@Component({
  selector: 'app-index',
  // imports: [],
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  // variables
  mItems: any[] = []

  itemForm:any
  search_term:any

  mProgress:boolean = false
  links:any= []

  constructor(
    private mMediaTagService: MediaTagService,
    private mToastrService:ToastrService,
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
    this.mMediaTagService.allItems().subscribe({
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
    this.mMediaTagService.paginateItems(item).subscribe({
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

  // onDelete
  onDelete(item:any){
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        cancelButton: 'btn btn-dark me-2',
        confirmButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    // Show
    // swal.fire({
    swalWithBootstrapButtons.fire({
      title: 'Remove?',
      text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete'
      // confirmButtonColor: '#e3342f',
      // cancelButtonColor: '#3490dc'
      }).then((result) => {
          //Delete
          if (result.isConfirmed) {
            this.mProgress = true
            this.mMediaTagService.deleteItem(item).subscribe({
              next: (response) => {
                if(response){
                  // console.log(response)
                  this.mItems = this.mItems.filter(items=>items.id !== item.id)
                  this.mToastrService.error((response as any).message)
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
      })
  }

  // onSearch
  onSearch(formValues: any){
    this.mProgress = true
    this.mMediaTagService.searchItems(formValues).subscribe({
      next: (response) => {
        if(response){
          this.mItems = (response as any).data
          // console.log(response)
          this.mToastrService.success((response as any).message)
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
