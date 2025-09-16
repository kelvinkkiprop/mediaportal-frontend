import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-media-card',
  imports: [CommonModule],
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
