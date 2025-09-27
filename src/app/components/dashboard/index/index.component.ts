import { Component } from '@angular/core';
import { AppContextService } from '../../../core/app-context.service';

@Component({
  selector: 'app-index',
  // imports: [],
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  constructor(
    public mAppContextService: AppContextService,
  ) {}


}
