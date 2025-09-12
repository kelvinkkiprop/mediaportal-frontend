import { Component } from '@angular/core';
// import
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-not-found',
  // imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  // goBack
  goBack(){
    this.location.back();
  }

}
