import { Component } from '@angular/core';
// import
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../../services/dashboard.service';
import { AppInfoService } from '../../../../core/app-info.service';
import { AppContextService } from '../../../../core/app-context.service';

@Component({
  selector: 'app-admin',
  // imports: [],
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  // variables
  mProgress:boolean = false
  item:any

  mTotalUsers?: number
  mTotalMedia?: number
  mTotalCourseModules?: number
  mTotalViews?: number
  mTotalInstitutions?: number

  mTopUploaders?: any[] = []


  mDisk: any
  mMemory: any
  mSwap: any

  constructor(
    private mToastrService: ToastrService,
    public mDashboardService: DashboardService,
    public mAppInfo: AppInfoService,
    public mAppContextService: AppContextService,
  ) { }

  ngOnInit(): void {
    // Call
    this.index()
    this.systemStats()
  }

  // index
  index(){
    this.mProgress = true
    this.mDashboardService.dashboard().subscribe({
      next: (response) => {
        if(response){
          this.mTotalUsers = (response as any).data.total_users;
          this.mTotalMedia = (response as any).data.total_media;
          this.mTotalViews = (response as any).data.total_Views;
          this.mTotalInstitutions = (response as any).data.total_organizations;
          this.mTopUploaders = (response as any).data.top_uploaders;
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

  // systemStats
  systemStats(){
    this.mProgress = true
    this.mDashboardService.systemStats().subscribe({
      next: (response) => {
        if(response){
          // console.log(response)
          this.mDisk = (response as any).disk;
          this.mMemory = (response as any).memory;
          this.mSwap = (response as any).swap;
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
