import { ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ChartComponent} from "ng-apexcharts";
import { AppContextService } from '../../../core/app-context.service';
import { ReportService } from '../../../services/report.service';
import { AppInfoService } from '../../../core/app-info.service';
import { UserService } from '../../../services/user.service';
// Set
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  standalone: false,
  selector: 'app-analytics',
  // imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  // variables
  @Input() data!: any

  mProgress: boolean = false
  item:any

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions:any;

  mMediaPerMonth:any
  mViewsPerMonth:any
  mLikesPerMonth:any
  mCommentsPerMonth:any

  constructor(
    public mAppContextService: AppContextService,
    private mUserService: UserService,
    private mToastrService: ToastrService,
    public mAppInfo: AppInfoService,
  ) { }

  // ngOnInit
  ngOnInit(): void {
    if (this.data) {
      // Set
      this.item = this.data
      // call
      this.index();
    }
  }

  ngAfterViewInit(): void {
    // Incase_chartOptions_arrives_late_force_reRender
    if (this.chartOptions && this.chart) {
      // call
      this.index();
    }
  }

  // index
  index(){
    this.mProgress = true
    this.mUserService.analyticsItem(this.item.id).subscribe({
      next: (response) => {
        if(response){
          this.item = (response as any).data
          this.mMediaPerMonth = Object.values(this.item.media_per_month)
          this.mViewsPerMonth = Object.values(this.item.views_per_month)
          this.mLikesPerMonth = Object.values(this.item.likes_per_month)
          this.mCommentsPerMonth = Object.values(this.item.comments_per_month)
          // call
          this.analytics()
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

  // analytics
  analytics() {
    this.chartOptions = {
      series: [
        {
          name: "Media",
          // data: [10, 41, 35, 51, 9, 62, 69, 9, 148,10,11,12]
          data: this.mMediaPerMonth
        },
        {
          name: "Views",
          // data: [10, 41, 35, 51, 9, 62, 69, 9, 148,10,11,12]
          data: this.mViewsPerMonth
        },
        {
          name: "Likes",
          // data: [10, 41, 35, 51, 9, 62, 69, 9, 148]
          data: this.mLikesPerMonth
        },
        {
          name: "Comments",
          // data: [10, 4, 35, 5, 49, 62, 6, 91, 148]
          data: this.mCommentsPerMonth
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      title: {
        text: "Yearly Trend",
        align: "center"
      }
    };
  }

}
