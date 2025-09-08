import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-show',
  // imports: [],
  standalone: false,
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

  // variables
  mProgress:boolean = false;

  id:any
  item:any = {}

  constructor(
    private route: ActivatedRoute,
    private mHomeService: HomeService,
    // private mToastrService: ToastrService,
    // public mContext: AppContextService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
        this.index(id);
        this.id = params.get('id');
        // console.log(this.id)
      }
    });
  }

  // index
  index(id:any){
    // this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mHomeService.getOneItem(id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // console.log(this.item)
          this.mProgress = false
        }
      },
      error: (error ) => {
        // console.log(error);
        // if(error.error.message){
        //   this.mToastrService.error(error.error.message)
        // }
        this.mProgress = false
      }
    });

  }

}
