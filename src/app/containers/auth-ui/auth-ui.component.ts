import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../components/shared/shared.module';
import { AppInfoService } from '../../core/app-info.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-auth-ui',
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './auth-ui.component.html',
  styleUrl: './auth-ui.component.scss'
})
export class AuthUIComponent {


  // variables
  mProgress: boolean = false;
  mCurrentUser:any

  constructor(
    public mAppInfo: AppInfoService,
    private mAuthService: AuthService,
    private mToastrService: ToastrService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.mProgress = true
    // call
    this.mCurrentUser = this.mAuthService.currentUser;
    this.mProgress = false
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

}
