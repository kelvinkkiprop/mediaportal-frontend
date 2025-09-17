import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Media } from '../../../interfaces/media';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-edit',
  // imports: [],
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  // variables
  mContentCategories: any
  mMediaTypes: any
  mOrganizations: any

  mSelectedCategories: any[] = [];

  itemForm: any
  mProgress: boolean = false

  id:any
  item:Media = {}


  constructor(
    public mToastrService: ToastrService,
    public mMediaService: MediaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // validation
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date_produced: ['', Validators.required],
      category_id: ['', Validators.nullValidator],
      tags: ['', Validators.nullValidator],
      type_id: ['', Validators.required],
      organization_id: ['', Validators.required],
      allow_comments: [false, Validators.nullValidator],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mProgress = true
    this.mMediaService.getOneItem(this.id).subscribe({
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

    // call
    this.index()
  }

  // index
  index(){
    this.mProgress = true
    this.mMediaService.unpaginatedItems().subscribe({
      next: (response) => {
        if(response){
          this.mContentCategories = (response as any).data.content_categories
          this.mMediaTypes = (response as any).data.media_types
          this.mOrganizations = (response as any).data.organizations
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
      title: formValues.title,
      description: formValues.description,
      date_produced: formValues.date_produced,
      // category_id: formValues.category_id,
      category_id: this.mSelectedCategories,
      tags: formValues.tags,
      type_id: formValues.type_id,
      organization_id: formValues.organization_id,
      allow_comments: formValues.allow_comments,
    }

    this.mProgress = true
    this.mMediaService.updateItem(item).subscribe({
      next: (response) => {
        if(response){
          // console.log(response);
          this.mToastrService.success((response as any).message);
          this.router.navigateByUrl('/media');
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

  // onCategoryChange
  onCategoryChange(event: any, categoryId: number) {
    if (event.target.checked) {
      this.mSelectedCategories.push(categoryId);
    } else {
      const index = this.mSelectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.mSelectedCategories.splice(index, 1);
      }
    }
  }


}
