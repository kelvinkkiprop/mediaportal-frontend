import { ChangeDetectorRef, Component, Input } from '@angular/core';
// import
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
// Add
import swal from 'sweetalert2';
import { PlaylistService } from '../../../services/playlist.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-playlist',
  // imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

  // variables
  @Input() data!: any
  item:any

  itemForm:any
  mProgress:boolean = false

  mLinks:any= []
  mCurrentPage = 1

  mLoadingMore  = false
  mHasMorePages = true

  mCurrentUser:any
  mItems: any[] = []

  mTypes:any = []
  mItemToEdit: any = {
    id: '',
    name: '',
    type_id: '',
    description: ''
  };

  constructor(
    private mUserService: UserService,
    private mToastrService:ToastrService,
    private mAuthService: AuthService,
    private mPlaylistService: PlaylistService,
    private fb: FormBuilder,
  ) {
    // validation
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      type_id: ['', Validators.required],
      description: ['', Validators.nullValidator],
    });
  }


  // ngOnInit
  ngOnInit(): void {
    // Set
    this.item = this.data
    // Call
    if(this.item){
      this.index(this.mCurrentPage)
    }
    this.mCurrentUser = this.mAuthService?.currentUser;
    // call
    this.unpaginatedItems()
  }

  // index
  index(pageOrUrl?: any) {
    if (this.mCurrentPage === 1) this.mProgress = true;
    const url = typeof pageOrUrl === 'string' ? pageOrUrl : `?page=${this.mCurrentPage}`;
    this.mUserService.playlistItems(url, this.item.id).subscribe({
      next: (response: any) => {
        // console.log(response)
        if (this.mCurrentPage === 1) {
          this.mItems = response.data;
        } else {
          this.mItems = [...this.mItems, ...response.data];
        }

        this.mProgress = false

        this.mLinks = response.links;
        this.mLoadingMore = false;

        // Disable_infinite_scroll_if_there_is_no_next_page
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
    const nextPage = this.mLinks.find((l: { label: string }) => l.label === 'Next &raquo;');
    if (nextPage) {
      this.mLoadingMore = true;
      this.mCurrentPage++;
      this.index(nextPage);
    } else {
      this.mHasMorePages = false;
    }
  }

  // unpaginatedItems
  unpaginatedItems(){
    this.mProgress = true
    this.mPlaylistService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mTypes = (response as any).data.types
          this.mProgress = false
        }
      },
      error: (error ) => {
        if(error.error.message){
          this.mToastrService.error(error.error.message)
        }
        this.mProgress = false
      }
    });
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
            this.mPlaylistService.deleteItem(item).subscribe({
              next: (response) => {
                if(response){
                  // console.log(response)
                  this.mItems = this.mItems.filter(items=>items.id !== item.id)
                  this.item = (response as any).item
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


  // onEdit
  onEdit(item:any){
    // console.log(item)
    // create_shallow_copy
    this.mItemToEdit = { ...item };
    //  update_form_values
     this.itemForm.patchValue(this.mItemToEdit);
  }

  // onSubmit
  onSubmit(formValues: any){
    const item: any = {
      id: this.mItemToEdit.id,
      name: formValues.name,
      type_id: formValues.type_id,
      description: formValues.description,
    };
    this.mProgress = true
    this.mPlaylistService.updateItem(item).subscribe({
    next: (response) => {
      if(response){
        if((response as any).status === 'success'){
           const updatedItem = (response as any).data;
          // find_item_index
          const index = this.mItems.findIndex(item => item.id === updatedItem.id);
          if (index > -1) {
            // replace_existing_iteme
            this.mItems[index] = updatedItem;
          } else {
            // else_just push_failsafe
            this.mItems = [updatedItem, ...this.mItems];
          }
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

}
