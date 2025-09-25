
// navbar-search.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  imports: [CommonModule, FormsModule],
})
export class NavbarSearchComponent {

  // variables
  query = '';
  suggestions: any[] = [];
  showSuggestions = false;

  constructor(
    private mDashboardService: DashboardService,
    private router: Router
  ) {}


  // onSearch
  onSearch(query: string) {
    this.query = query;
    if (query.trim()) {
      this.mDashboardService.getSuggestions(query).subscribe((results) => {
        this.suggestions = results;
        // show_dropdown
        this.showSuggestions = true;
      });
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  // onSelect
  onSelect(mSuggestion: any) {
    // this.router.navigate(['/media/show', suggestion.id]);
    this.router.navigate(['/media/watch'], {
      queryParams: {
        video: mSuggestion.id,
      }
    });
    this.query = '';
    this.suggestions = [];
    // hide_dropdown
    this.showSuggestions = false;
  }

}
