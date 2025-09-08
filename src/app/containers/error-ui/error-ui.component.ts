import { CommonModule } from '@angular/common';
// import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-ui',
  imports: [CommonModule, RouterModule],
  templateUrl: './error-ui.component.html',
  styleUrl: './error-ui.component.scss'
})
export class ErrorUIComponent {

}
