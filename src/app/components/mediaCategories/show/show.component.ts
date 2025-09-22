import { Component } from '@angular/core';
// import
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentCategoryService } from '../../../services/content-category.service';

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

  mItems:any [] = []

  mProgress:boolean = false
  links:any= []

  currentPage = 1;
  mLoadingMore  = false;
  mHasMorePages = true;

  constructor(
    public mToastrService: ToastrService,
    public mContentCategoryService: ContentCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mContentCategoryService.getOneItem(this.id).subscribe({
      next: (response) => {
        if(response){
          this.item = response
          // call
          this.index(this.currentPage)
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

  // index
  index(pageOrUrl?: any) {
    if (this.currentPage === 1) this.mProgress = true;
    const url = typeof pageOrUrl === 'string' ? pageOrUrl : `?page=${this.currentPage}`;

    this.mContentCategoryService.categorizedItems(url, this.item.id).subscribe({
      next: (res: any) => {
        if (this.currentPage === 1) {
          this.mItems = res.data;
          // console.log(this.mItems)
        } else {
          this.mItems = [...this.mItems, ...res.data];
        }
        this.mProgress = false

        this.links = res.links;
        this.mLoadingMore = false;

        // Disable_infinite_scroll_if_there_is_no_next_page
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
      this.index(nextPage);
    } else {
      this.mHasMorePages = false;
    }
  }

}


