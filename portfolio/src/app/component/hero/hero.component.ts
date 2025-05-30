import { Component, HostListener, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, AfterViewInit {
  menuOpen = false;             // Stato del menu hamburger
  fadeOpacity = 0;              // Opacità per il fade-in del testo

  @ViewChild('heroVideo', { static: true })
  videoRef!: ElementRef<HTMLVideoElement>; // Riferimento al video nel template

  private videoDuration = 0;    // Durata del video
  private startOffset = 0;      // Inizio sezione hero
  private sectionHeight = 0;    // Altezza sezione hero

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Al caricamento dei metadata del video, salvo la durata
    this.videoRef.nativeElement.addEventListener('loadedmetadata', () => {
      this.videoDuration = this.videoRef.nativeElement.duration;
    });
  }

  ngAfterViewInit(): void {
    // Calcolo offset e altezza della sezione hero per la logica di scroll
    const section = this.el.nativeElement.querySelector('.hero');
    this.startOffset = section.offsetTop;
    this.sectionHeight = section.offsetHeight;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY;                         // Posizione corrente dello scroll
    const relativeScroll = scrollY - this.startOffset;      // Scroll relativo alla sezione hero

    if (this.videoDuration > 0) {
      // Calcolo ratio per scrub del video
      let scrubRatio = relativeScroll / this.sectionHeight;
      scrubRatio = Math.max(0, Math.min(1, scrubRatio));    // Clamp tra 0 e 1
      this.videoRef.nativeElement.currentTime = scrubRatio * this.videoDuration;

      // Calcolo opacità fade-in nei primi 50% dello scroll hero
      let fadeRatio = relativeScroll / (this.sectionHeight / 2);
      fadeRatio = Math.max(0, Math.min(1, fadeRatio));      // Clamp tra 0 e 1
      this.fadeOpacity = fadeRatio;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;                         // Toggle stato menu
  }
}