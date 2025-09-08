// sidebar.service.ts
import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Using Angular 19 signals for reactive state
  private _isCollapsed = signal(true); // Start collapsed as per your body class
  private _isMini = signal(true);

  // Public readonly signals
  isCollapsed = this._isCollapsed.asReadonly();
  isMini = this._isMini.asReadonly();

  constructor() {
    // Effect to update body classes when state changes
    effect(() => {
      this.updateBodyClasses();
    });
  }

  toggle() {
    this._isCollapsed.update(current => !current);
  }

  collapse() {
    this._isCollapsed.set(true);
  }

  expand() {
    this._isCollapsed.set(false);
  }

  toggleMini() {
    this._isMini.update(current => !current);
  }

  private updateBodyClasses() {
    const body = document.body;

    // Remove existing classes
    body.classList.remove('sidebar-collapse', 'sidebar-open');

    // Add appropriate classes based on state
    if (this._isCollapsed()) {
      body.classList.add('sidebar-collapse');
    } else {
      body.classList.add('sidebar-open');
    }

    // Handle mini sidebar
    if (this._isMini()) {
      body.classList.add('sidebar-mini');
    } else {
      body.classList.remove('sidebar-mini');
    }
  }

}
