import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private dark = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const hour = new Date().getHours();
      this.dark = hour >= 18;
      this.updateMode();
    }
  }

  toggle() {
    if (!this.isBrowser) return;
    this.dark = !this.dark;
    this.updateMode();
  }

  private updateMode() {
    document.body.classList.toggle('dark-mode', this.dark);
    document.body.classList.toggle('light-mode', !this.dark);
  }
}