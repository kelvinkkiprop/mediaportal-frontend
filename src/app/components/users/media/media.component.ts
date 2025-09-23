import { Component, Input } from '@angular/core';
// import
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-media',
  // imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {

  // variables
  @Input() data!: any
  item:any

  mProgress:boolean = false
  mItems: any[] = []

  mLinks:any= []
  mCurrentPage = 1

  mLoadingMore  = false
  mHasMorePages = true

  constructor(
    private mUserService: UserService,
    private mToastrService:ToastrService,
  ) { }


  // ngOnInit
  ngOnInit(): void {
    // Set
    this.item = this.data
    // Call
    if(this.item){
      this.index(this.mCurrentPage)
    }
  }

  // index
  index(pageOrUrl?: any) {
    if (this.mCurrentPage === 1) this.mProgress = true;
    const url = typeof pageOrUrl === 'string' ? pageOrUrl : `?page=${this.mCurrentPage}`;

    this.mUserService.mediaItems(url, this.item.id).subscribe({
      next: (res: any) => {
        if (this.mCurrentPage === 1) {
          this.mItems = res.data;
        } else {
          this.mItems = [...this.mItems, ...res.data];
        }
        this.mProgress = false

        this.mLinks = res.links;
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

}
