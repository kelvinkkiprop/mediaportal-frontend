import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { ContentCategoryService } from '../../../services/content-category.service';

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

  currentPage = 1;
  mLoadingMore  = false;
  mHasMorePages = true;

  constructor(
    private mContentCategoryService: ContentCategoryService,
    private mToastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    //Call
    this.index(this.currentPage)

    //validation
    this.search_term = new FormControl('', Validators.required)
    this.itemForm = new FormGroup({
      search_term: this.search_term,
    })
  }


  index(pageOrUrl?: any) {
    // if a full URL is passed, use it; otherwise build it using currentPage
    const url = typeof pageOrUrl === 'string'
      ? pageOrUrl
      : `?page=${this.currentPage}`;

    this.mContentCategoryService.allItems(url).subscribe({
      next: (res: any) => {
        if (this.currentPage === 1) {
          this.mItems = res.data;
        } else {
          this.mItems = [...this.mItems, ...res.data];
        }

        this.links = res.links;
        this.mLoadingMore = false;

        // ✅ Disable infinite scroll if there is no next page
        const nextPage = this.links.find((l: { label: string }) => l.label === 'Next &raquo;');
        this.mHasMorePages = !!nextPage?.url;
      },
      error: () => {
        this.mLoadingMore = false;
        this.mHasMorePages = false;
      }
    });
  }


  // onLoadMore
  onLoadMore() {
    if (!this.mHasMorePages || this.mLoadingMore) return;

    const nextPage = this.links.find((l: { label: string }) => l.label === 'Next &raquo;');
    if (nextPage) {
      this.mLoadingMore = true;
      this.currentPage++;
      this.index(nextPage); // ✅ Now this works with full URL
    } else {
      this.mHasMorePages = false;
    }
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
            this.mContentCategoryService.deleteItem(item).subscribe({
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
    this.mContentCategoryService.searchItems(formValues).subscribe({
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
