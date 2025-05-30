import { Directive, HostListener, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../service/theme.service';

@Directive({standalone: true, selector: '[appCursorMode]'})
export class CursorModeDirective {
  private circle!: HTMLElement;
  private isBrowser: boolean;

  constructor(
    private r: Renderer2,
    private theme: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.circle = this.r.createElement('div');
      this.r.addClass(this.circle, 'cursor-circle');
      document.body.appendChild(this.circle);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  move(e: MouseEvent) {
    if (!this.isBrowser) return;
    this.r.setStyle(this.circle, 'left', e.clientX + 'px');
    this.r.setStyle(this.circle, 'top', e.clientY + 'px');
  }

  @HostListener('document:mouseenter')
  enter() {
    if (!this.isBrowser) return;
    this.r.setStyle(this.circle, 'display', 'block');
  }

  @HostListener('document:mouseleave')
  leave() {
    if (!this.isBrowser) return;
    this.r.setStyle(this.circle, 'display', 'none');
  }
}