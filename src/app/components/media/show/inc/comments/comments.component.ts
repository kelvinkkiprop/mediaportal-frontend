import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../../../../../services/comment.service';
import { AppContextService } from '../../../../../core/app-context.service';
import { FormBuilder, Validators } from '@angular/forms';
// Add
import swal from 'sweetalert2';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-comments',
  // imports: [],
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnChanges {

  // variables
  @Input() data!: any;
  item:any

  mItems: any[] = []
  mLinks:any= []

  mCurrentPage = 1;
  mLoadingMore  = false;
  mHasMorePages = true;

  itemForm: any
  mProgress:boolean = false;

  mItemForm: any
  mEditIndex: number | null = null;

  mCurrentUser:any

  constructor(
    private mCommentService: CommentService,
    private mToastrService:ToastrService,
    public mAppContextService:AppContextService,
    private mAuthService: AuthService,
    private fb: FormBuilder,
  ) {
    // validation
    this.itemForm = this.fb.group({
      text: ['', Validators.required],
    });
    this.mItemForm = this.fb.group({
      comment_text: ['', Validators.required],
      // comment_id: ['', Validators.required],
    });
  }

  // ngOnInit
  ngOnInit(): void {
    // Set
    // console.log(this.data)
    this.item = this.data
    this.mCurrentUser = this.mAuthService?.currentUser;
  }

  // ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.item = this.data;
      this.mItems = [];
      this.mCurrentPage = 1;
      this.index(this.mCurrentPage);
    }
  }

  // index
  index(pageOrUrl?: any) {
    // if_full_URL_is_passed_use_it_else_build_it_using_currentPage
    const url = typeof pageOrUrl === 'string' ? pageOrUrl : `?page=${this.mCurrentPage}`;
    this.mCommentService.filteredItems(url, this.item.id).subscribe({
      next: (res: any) => {
        if (this.mCurrentPage === 1) {
          this.mItems = res.data;
        } else {
          this.mItems = [...this.mItems, ...res.data];
        }
        this.mLinks = res.links;
        this.mLoadingMore = false;

        // Disable_infinite_scroll_if_no_next_page
        const nextPage = this.mLinks.find((l: { label: string }) => l.label === 'Next &raquo;');
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
    // console.log(this.mLinks)
    const nextPage = this.mLinks.find((l: { label: string }) => l.label === 'Next &raquo;');
    if (nextPage) {
      this.mLoadingMore = true;
      this.mCurrentPage++;
      this.index(nextPage);
    } else {
      this.mHasMorePages = false;
    }
  }

  // onSubmit
  onSubmit(formValues: any){
    const item: any = {
      media_id: this.item.id,
      text: formValues.text,
    };
    this.mProgress = true
    this.mCommentService.createItem(item).subscribe({
    next: (response) => {
      if(response){
        if((response as any).status === 'success'){
            // console.log(response)
            this.item = (response as any).data.item
            // this.mItems = [...this.mItems, { ...(response as any).data.comment }];
            this.mItems = [{ ...(response as any).data.comment }, ...this.mItems];
            this.itemForm.reset()
            this.mToastrService.success((response as any).message)
          }
          this.mProgress = false
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
            this.mCommentService.deleteItem(item).subscribe({
              next: (response) => {
                if(response){
                  // console.log(response)
                  this.mItems = this.mItems.filter(items=>items.id !== item.id)
                  this.item = (response as any).item.media
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

  // onStartEdit
  onStartEdit(index: number) {
    this.mEditIndex = index;
    // console.log(this.mEditIndex)
  }

  // onCancelEdit
  onCancelEdit() {
    this.mEditIndex = null;
  }

  // onUpdate
  onUpdate(formValues: any, id:any) {
    // console.log('Saving item', id);
    this.mEditIndex = null;

    const item: any = {
      id: id,
      text: formValues.comment_text,
    };
    this.mProgress = true
    this.mCommentService.updateItem(item).subscribe({
    next: (response) => {
      if(response){
        if((response as any).status === 'success'){
            // this.mItems = [(response as any).data,...this.mItems.filter(i => i.id !== item.id)];
            this.mItems = this.mItems.map(i =>i.id === item.id ? (response as any).data : i);
            this.mToastrService.success((response as any).message)
          }
          this.mProgress = false
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
