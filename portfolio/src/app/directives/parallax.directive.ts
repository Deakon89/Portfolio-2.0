import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({standalone: true, selector: '[appParallax]'})
export class ParallaxDirective {
  constructor(private el: ElementRef) {}
  @HostListener('window:scroll')
  onScroll() {
    this.el.nativeElement.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
  }
}