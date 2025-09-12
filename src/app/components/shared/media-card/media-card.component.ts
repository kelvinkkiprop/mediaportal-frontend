import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media-card',
  imports: [],
  standalone: true,
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {

  // variables
  @Input() data!: any;
  item:any

  // ngOnInit
  ngOnInit(): void {
    // Set
    this.item = this.data
    // console.log(this.item)
  }

}
