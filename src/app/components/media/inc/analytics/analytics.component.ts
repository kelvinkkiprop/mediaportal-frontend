import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppContextService } from '../../../../core/app-context.service';
import { ReportService } from '../../../../services/report.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ChartComponent
} from "ng-apexcharts";
import { AppInfoService } from '../../../../core/app-info.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-analytics',
  // imports: [],
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  // variables
  mProgress: boolean = false
  item:any

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions:any;

  mMediaPerMonth:any
  mViewsPerMonth:any
  mLikesPerMonth:any
  mCommentsPerMonth:any

  constructor(
    public mContext: AppContextService,
    private mReportService: ReportService,
    private mToastrService: ToastrService,
    public mAppInfo: AppInfoService,
  ) { }

  // ngOnInit
  ngOnInit(): void {
    // call
    this.index()
    // this.reports()
  }

  // index
  index(){
    this.mProgress = true
    this.mReportService.analyticsItems().subscribe({
      next: (response) => {
        if(response){
          this.item = (response as any).data
          this.mMediaPerMonth = Object.values(this.item.media_per_month)
          this.mViewsPerMonth = Object.values(this.item.views_per_month)
          this.mLikesPerMonth = Object.values(this.item.likes_per_month)
          this.mCommentsPerMonth = Object.values(this.item.comments_per_month)
          // alert(this.mMediaPerMonth)
          // call
          this.reports()
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



  reports() {
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
