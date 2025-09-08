import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppContextService } from '../../../core/app-context.service';
import { HomeService } from '../../../services/home.service';
import { AppInfoService } from '../../../core/app-info.service';

@Component({
  selector: 'app-index',
  // imports: [],
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {


  // variables
  mProgress:boolean = false
  itemForm: any
  item:any

  mMedia?: any[] = []

  constructor(
    // private mToastrService: ToastrService,
    public mHomeService: HomeService,
    public mAppInfo: AppInfoService,
    public mAppContextService: AppContextService,
    private fb: FormBuilder
  ) {
    // validation
    this.itemForm = this.fb.group({
      payment_method_id: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    // Call
    this.index()
  }

  // index
  index(){
    this.mProgress = true
    this.mHomeService.index().subscribe({
      next: (response) => {
        if(response){
          this.mMedia = (response as any).data.media
          // console.log(this.mMyInterests)
          this.mProgress = false;
        }
      },
      error: (error ) => {
        // console.log(error);
        if(error.error.message){
          // this.mToastrService.error(error.error.message);
        }
        this.mProgress = false
      }
    });
  }

}
