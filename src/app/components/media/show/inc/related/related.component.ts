import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../../../../services/media.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { ProfileService } from '../../../../../services/profile.service';
// Add
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related',
  // imports: [],
  standalone: false,
  templateUrl: './related.component.html',
  styleUrl: './related.component.scss'
})
export class RelatedComponent implements OnChanges {

  // variables
  @Input() data!: any;
  item:any

  itemForm: any;
  mProgress:boolean = false;

  mItems: any[] = []
  mLinks:any= []

  mCurrentPage = 1;
  mLoadingMore  = false;
  mHasMorePages = true;

  mCurrentUser:any
  mCurrentIndex = 0;

  constructor(
    private mMediaService: MediaService,
    private mProfileService: ProfileService,
    private mToastrService:ToastrService,
    private fb: FormBuilder,
    private mAuthService: AuthService,
    private router: Router,
  ) {
    // validation
    this.itemForm = this.fb.group({
      autoplay: ['', Validators.required],
    });

  }

  // ngOnInit
  ngOnInit(): void {
    // Set
    this.item = this.data
    this.mCurrentUser = this.mAuthService?.currentUser;
  }

  // ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      // call_when_new_data_arrives_only
      this.item = this.data
      this.mItems = []
      this.index(this.mCurrentPage);
    }
  }

  // index
  index(pageOrUrl?: any) {
    // if_full_URL_is_passed_use_it_else_build_it_using_currentPage
    const url = typeof pageOrUrl === 'string' ? pageOrUrl : `?page=${this.mCurrentPage}`;
    this.mMediaService.relatedItems(url, this.item.id).subscribe({
      next: (res: any) => {
        if (this.mCurrentPage === 1) {
          this.mItems = res.data;
          // console.log(this.mItems)
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
      user_id: this.mCurrentUser.id,
      autoplay: formValues.autoplay,
    }
    this.mProgress = true
    this.mProfileService.updateAutoplay(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mAuthService.saveUserLocally(response)
          this.mToastrService.success((response as any).message);
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

  // playNextVideo
  playNextVideo() {
    if (this.mCurrentUser?.autoplay===true) {
      // Get the next item
      const nextItem = this.mItems[this.mCurrentIndex];
      if (!nextItem) return;
      // console.log('Next video ID:', nextItem.id);
      // Navigate
      this.router.navigate(['/media/watch'], {
        queryParams: {
          video: nextItem.id,
        }
      });
    } else {
      // Show modal if autoplay is off
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          cancelButton: 'btn btn-dark me-2',
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: 'Video Finished!',
        text: `${this.item.title} ended!`,
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Home'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

}
