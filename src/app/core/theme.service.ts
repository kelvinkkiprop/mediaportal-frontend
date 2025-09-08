// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private themeKey = 'theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initThemeListener();
  }

  getStoredTheme(): string | null {
    return localStorage.getItem(this.themeKey);
  }

  getPreferredTheme(): string {
    const stored = this.getStoredTheme();
    if (stored) return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  setTheme(theme: string) {
    if (theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    this.renderer.setAttribute(document.documentElement, 'data-bs-theme', theme);
  }

  private initThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const stored = this.getStoredTheme();
      if (stored !== 'light' && stored !== 'dark') {
        this.setTheme(this.getPreferredTheme());
      }
    });
  }
}
