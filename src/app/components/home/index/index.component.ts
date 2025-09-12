import { Component } from '@angular/core';
// import
import { AppContextService } from '../../../core/app-context.service';
import { HomeService } from '../../../services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-index',
  // imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  // variables
  mProgress:boolean = false
  item:any

  mPartners?: any[] = []
  mRandomCourseModule?: any
  mTopCourseModules?: any[] = []
  mMediaCategories?: any[] = []

  constructor(
    private mToastrService: ToastrService,
    public mHomeService: HomeService,
    public mContext: AppContextService
  ) { }

  ngOnInit(): void {
    // Call
    this.index()
  }

  // index
  index(){
    this.mProgress = true
    this.mHomeService.allItems().subscribe({
      next: (response) => {
        if(response){
          this.mPartners = (response as any).data.partners;
          this.mRandomCourseModule = (response as any).data.random_course_module;
          this.mTopCourseModules = (response as any).data.top_course_modules;
          this.mMediaCategories = (response as any).data.course_categories;
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

  // onFilter
  onFilter(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    // console.log('Selected value:', selectedValue);
    this.mProgress = true
    this.mHomeService.filter(selectedValue).subscribe({
      next: (response) => {
        if(response){
          this.mTopCourseModules = response
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

  // onSearch
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    // console.log('Searching for:', value);
    // this.mProgress = true
    this.mHomeService.search(value).subscribe({
      next: (response) => {
        if(response){
          this.mTopCourseModules = response
          // this.mProgress = false
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
