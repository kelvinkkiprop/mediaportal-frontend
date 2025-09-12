// layout.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarService } from '../../core/sidebar.service';
import { AppInfoService } from '../../core/app-info.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../components/shared/shared.module';
import { AppContextService } from '../../core/app-context.service';
import { ThemeService } from '../../core/theme.service';
import { AuthService } from '../../services/auth.service';
import { NavbarSearchComponent } from './inc/navbar-search/navbar-search.component';

@Component({
  selector: 'app-admin-lte',
  imports: [CommonModule, RouterModule, RouterOutlet, FormsModule, NavbarSearchComponent, SharedModule],
  templateUrl: './admin-lte.component.html',
  styleUrl: './admin-lte.component.scss'
})
export class AdminLTEComponent implements OnInit {

  // variables
  sidebarService = inject(SidebarService);
  usersMenuOpen = false;

  mProgress: boolean = false;
  mCurrentUser:any

  constructor(
    private mAuthService: AuthService,
    private mToastrService: ToastrService,
    private router: Router,
    public mAppInfo: AppInfoService,
    public mAppContextService: AppContextService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    // Initialize sidebar state based on body classes
    const hasCollapseClass = document.body.classList.contains('sidebar-collapse');
    if (!hasCollapseClass) {
      this.sidebarService.expand();
    }
    // set
    this.mCurrentUser = this.mAuthService.currentUser;
  }

  ngAfterViewInit(): void {
    const preferred = this.themeService.getPreferredTheme();
    this.themeService.setTheme(preferred);
    this.highlightActiveButton(preferred);

    const buttons = document.querySelectorAll('[data-bs-theme-value]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-bs-theme-value');
        localStorage.setItem('theme', theme!);
        this.themeService.setTheme(theme!);
        this.highlightActiveButton(theme!);
      });
    });
  }

  // toggleSidebar
  toggleSidebar() {
    this.sidebarService.toggle();
  }

  // toggleUsersMenu
  toggleUsersMenu(event: Event) {
    event.preventDefault();
    this.usersMenuOpen = !this.usersMenuOpen;
  }

  // highlightActiveButton
  private highlightActiveButton(theme: string) {
    const buttons = document.querySelectorAll('[data-bs-theme-value]');
    const iconTarget = document.querySelector('.theme-icon-active i');
    const themeText = document.querySelector('#bd-theme-text');
    const switcher = document.querySelector('#bd-theme');

    buttons.forEach(el => {
      el.classList.remove('active');
      el.setAttribute('aria-pressed', 'false');
    });

    const activeBtn = document.querySelector(`[data-bs-theme-value="${theme}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-pressed', 'true');

      const iconClass = activeBtn.querySelector('i')?.getAttribute('class') || '';
      iconTarget?.setAttribute('class', iconClass);
      const label = `${themeText?.textContent} (${theme})`;
      switcher?.setAttribute('aria-label', label);
    }
  }

  // onLogout
  onLogout(){
    this.mProgress = true
    this.mAuthService.logout().subscribe({
      next: (response) => {
        if(response.status =='success'){
          this.mToastrService.success(response.message);
          this.router.navigateByUrl('/auth/login');
          this.mProgress = false;
        }else{
          this.mToastrService.error(response.message);
          this.mProgress = false;
        }
      },
      error: (error ) => {
        this.mToastrService.error(error.error.message);
        this.mProgress = false
      }
    });
  }


  onSearch(q: string) {
    console.log('Search executed:', q);
    // real search logic
  }

  onSelect(item: string) {
    console.log('Suggestion chosen:', item);
    // navigate or perform action
  }


}
