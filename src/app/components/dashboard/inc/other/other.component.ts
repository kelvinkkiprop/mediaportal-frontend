import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-other',
  // imports: [],
  standalone: false,
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent {

  // variables
  mProgress:boolean = false
  itemForm: any
  item:any

  mFeaturedMedia?: any[] = []
  mRecommendedMedia?: any[] = []
  mLatestMedia?: any[] = []

  constructor(
    private mToastrService: ToastrService,
    public mDashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    // Call
    this.index()
  }

  // index
  index(){
    this.mProgress = true
    this.mDashboardService.dashboard2().subscribe({
      next: (response) => {
        if(response){
          this.mFeaturedMedia = (response as any).data.featured_media
          this.mRecommendedMedia = (response as any).data.recommended_media
          this.mLatestMedia = (response as any).data.latest_media
          this.mProgress = false;
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
