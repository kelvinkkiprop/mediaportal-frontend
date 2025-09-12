import { Component } from '@angular/core';
// import
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-index',
  // imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  // variables
  param1:any
  param2:any

  constructor(
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.param1 = this.route.snapshot.paramMap.get('param1');
    this.param2 = this.route.snapshot.paramMap.get('param2');
  }

  // goBack
  goBack(){
    this.location.back();
  }

}
