import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
// Assicurati di aver messo SplitText.js in assets/gsap e di importarlo così
import SplitText from 'gsap/SplitText';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('headline', { static: true }) headline!: ElementRef<HTMLElement>;
  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    const el = this.headline.nativeElement;
    gsap.set(el, { opacity: 1 });           // nasconde l’h1
  }

  animateText() {
    if (!this.isBrowser) return;
    const el = this.headline.nativeElement;

    // crea un nuovo SplitText ad ogni click
    const split = new SplitText(el, {
      type: 'chars, words',
      charsClass: 'char',
      
    });

    // animali tutti
    gsap.from(split.chars, {
      duration: 3,
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: '0% 50% -50',
      ease: 'back',
      stagger: 0.05,
      onComplete: () => {
        split.revert();                      // ripristina il DOM originale
        el.removeAttribute('aria-hidden');  // se hai usato aria-hidden per accessibilità
      }
    });
  }
}
