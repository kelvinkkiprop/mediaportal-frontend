import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent } from "ng-apexcharts";

// Set
export type ChartOptions = {
  // ✅ Support both bar (axis) and pie/donut (non-axis)
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;

  chart: ApexChart;
  title: ApexTitleSubtitle;

  // ✅ Axis chart props (used only for bar/column)
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;

  // ✅ Non-axis chart props (used only for pie/donut)
  labels: string[];
};


@Component({
  standalone: false,
  selector: 'app-index',
  // imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  // variables
  mProgress: boolean = false
  @ViewChild("mChart") mChart!: ChartComponent;

  // Initialize
  public mChartMediaByStatus: ChartOptions = {
    series: [],
    chart: {type: 'bar',height: 350},
    title: {text: 'Media by Status'},
    xaxis: {categories: []},
    labels: [],
    plotOptions: {bar: { borderRadius: 6 }},
    dataLabels: {enabled: true}
  };

  public mChartUsersByStatus: ChartOptions = {
    series: [],
    chart: {type: 'donut',height: 350},
    title: {text: 'Users by Status'},
    xaxis: { categories: []},
    labels: [],
    plotOptions: {bar: { borderRadius: 6 }},
    dataLabels: {enabled: true}
  };

  public mChartViewsByUser: ChartOptions = {
    series: [],
    chart: {type: 'area',height: 350},
    title: {text: 'Views by User'},
    xaxis: { categories: []},
    labels: [],
    plotOptions: {bar: { borderRadius: 6 }},
    dataLabels: {enabled: true}
  };

  public mChartViewsByDeviceType: ChartOptions = {
    series: [],
    chart: {type: 'pie',height: 350},
    title: {text: 'Views by Device Type'},
    xaxis: { categories: []},
    labels: [],
    plotOptions: {bar: { borderRadius: 6 }},
    dataLabels: {enabled: true}
  };

  constructor(
    private mToastrService: ToastrService,
    public mReportService: ReportService,
  ) { }

    ngOnInit(): void {
    // Call
    this.index()
  }

  // index
  index(){
    this.mProgress = true
    this.mReportService.allItems().subscribe({
      next: (response) => {
        if(response){
          let mMediaByStatus = (response as any).data.media_by_status;
          const mMediaCategories = mMediaByStatus.map((item: any) => item.status?.name);
          const mMediaCounts = mMediaByStatus.map((item: any) => item.total);
          // Update_chartOptions
          if (this.mChartMediaByStatus.chart.type === 'bar') {
            // donut_mode
            this.mChartMediaByStatus.series = [{ name: 'Media', data: mMediaCounts }];
            this.mChartMediaByStatus.xaxis = { categories: mMediaCategories };
          } else {
            // bar_mode
            this.mChartMediaByStatus.series = mMediaCounts;
            this.mChartMediaByStatus.labels = mMediaCategories;
          }

          let mUsersByStatus = (response as any).data.users_by_status;
          const mUsersCategories = mUsersByStatus.map((item: any) => item.status?.name);
          const mUsersCounts = mUsersByStatus.map((item: any) => item.total);
          if (this.mChartUsersByStatus.chart.type === 'donut') {
            // donut_mode
            this.mChartUsersByStatus.series = mUsersCounts;
            this.mChartUsersByStatus.labels = mUsersCategories;
          } else {
            // bar_mode
            this.mChartUsersByStatus.series = [{ name: 'Users', data: mUsersCounts }];
            this.mChartUsersByStatus.xaxis = { categories: mUsersCategories };
          }

          let mViewsByUser = (response as any).data.views_by_user;
          const mViewsCategories = mViewsByUser.map((item: any) => item.user?.full_name);
          const mViewsCounts = mViewsByUser.map((item: any) => item.user_total_views);
          if (this.mChartViewsByUser.chart.type === 'pie') {
            // donut_mode
            this.mChartViewsByUser.series = mViewsCounts;
            this.mChartViewsByUser.labels = mViewsCategories;
          } else {
            // bar_mode
            this.mChartViewsByUser.series = [{ name: 'Views', data: mViewsCounts }];
            this.mChartViewsByUser.xaxis = { categories: mViewsCategories };
          }

          let mViewsByDeviceType = (response as any).data.views_by_device_type;
          const mDeviceTypeCategories = mViewsByDeviceType.map((item: any) => item.device_type?.name);
          const mDeviceTypeCounts = mViewsByDeviceType.map((item: any) => item.total);
          if (this.mChartViewsByDeviceType.chart.type === 'pie') {
            // donut_mode
            this.mChartViewsByDeviceType.series = mDeviceTypeCounts;
            this.mChartViewsByDeviceType.labels = mDeviceTypeCategories;
          } else {
            // bar_mode
            this.mChartViewsByDeviceType.series = [{ name: 'Device Type', data: mDeviceTypeCounts }];
            this.mChartViewsByDeviceType.xaxis = { categories: mDeviceTypeCategories };
          }

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
