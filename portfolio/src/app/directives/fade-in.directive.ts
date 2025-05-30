import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({standalone: true, selector: '[appFadeIn]'})
export class FadeInDirective implements OnInit {
  private obs!: IntersectionObserver;
  constructor(private el: ElementRef, private r: Renderer2) {}
  ngOnInit() {
    this.r.setStyle(this.el.nativeElement, 'opacity', '0');
    this.obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.r.addClass(this.el.nativeElement, 'fade-in');
          this.obs.disconnect();
        }
      });
    });
    this.obs.observe(this.el.nativeElement);
  }
}