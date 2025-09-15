import { Component } from '@angular/core';
// import
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaCategory } from '../../../interfaces/media-category';
import { MediaTagService } from '../../../services/media-tag.service';

@Component({
  selector: 'app-edit',
  // imports: [],
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {


  // variables
  itemForm: any;
  mProgress: boolean = false;

  id:any
  item:MediaCategory = {}


  constructor(
    public mToastrService: ToastrService,
    public mMediaTagService: MediaTagService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // validation
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mMediaTagService.getOneItem(this.id).subscribe({
      next: (response) => {
        if(response){
          this.item = response as any
          // console.log(response)
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

  // onSubmit
  onSubmit(formValues: any){
    // const item: User = {
    const item: any = {
      id: this.id,
      name: formValues.name,
    }
    this.mProgress = true
    this.mMediaTagService.updateItem(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/media-tags');
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
}

