import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../../../services/media.service';

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
    private mMediaService: MediaService,
    private mToastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
        this.index(id);
        this.id = params.get('id');
      }
    });
  }

  // index
  index(id:any){
    this.mProgress = true
    this.mMediaService.getOneItem(id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // console.log(this.item)
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

}
