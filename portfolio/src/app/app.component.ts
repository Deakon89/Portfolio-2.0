import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OrientationAlertComponent } from './component/orientation-alert/orientation-alert.component';

interface Layer { id: string; speedY: number; speedX?: number; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OrientationAlertComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // velocità personalizzate
  planets: Layer[] = [
    { id: 'planet1', speedY: 0.3 },
    { id: 'planet2', speedY: 0.35 },
    { id: 'planet3', speedY: 0.4 },
    { id: 'planet4', speedY: 0.45 }
  ];
  ships: Layer[] = [
    { id: 'ship1', speedY: 0.25 },
    { id: 'ship2', speedY: 0.3 },
    { id: 'ship3', speedY: 0.35 }
  ];

  @ViewChildren('parallaxPlanet', { read: ElementRef }) planetEls!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('parallaxShip', { read: ElementRef }) shipEls!: QueryList<ElementRef<HTMLElement>>;

  private vw!: number;
  private vh!: number;
  private isBrowser: boolean;

  // stato dei layers
  private planetStates: Record<string, { x: number; y: number; angle: number }> = {};
  private shipStates: Record<string, { x: number; y: number }> = {};

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    // inizializza planets sotto lo schermo
    this.planetEls.forEach(elRef => {
      const el = elRef.nativeElement;
      this.spawnPlanet(el.id, el);
    });

    // inizializza ships con spawn random sui bordi
    this.shipEls.forEach(elRef => {
      const el = elRef.nativeElement;
      this.spawnShip(el.id, el);
    });

    this.animateLoop();
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) {
      return;
    }
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
  }

  private animateLoop() {
    if (!this.isBrowser) {
      return;
    }

    // Move and loop planets
    this.planetEls.forEach(elRef => {
      const el = elRef.nativeElement;
      const st = this.planetStates[el.id];
      const cfg = this.planets.find(p => p.id === el.id)!;

      st.y -= cfg.speedY * 2;
      if (st.y < -el.offsetHeight) {
        this.spawnPlanet(el.id, el);
      }

      if (el.id === 'planet3' || el.id === 'planet4') {
        st.angle = (st.angle + 2) % 360;
        el.style.transform = `translate(${st.x}px, ${st.y}px) rotate(${st.angle}deg)`;
      } else {
        el.style.transform = `translate(${st.x}px, ${st.y}px)`;
      }
    });

    // Move and loop ships downward
    this.shipEls.forEach(elRef => {
      const el = elRef.nativeElement;
      const st = this.shipStates[el.id];
      const cfg = this.ships.find(s => s.id === el.id)!;

      st.y += cfg.speedY * 2;
      if (st.y > this.vh + el.offsetHeight) {
        this.spawnShip(el.id, el);
      }

      el.style.transform = `translate(${st.x}px, ${st.y}px)`;
    });

    requestAnimationFrame(() => this.animateLoop());
  }

  private spawnPlanet(id: string, el: HTMLElement) {
    const x = Math.random() * (this.vw - el.offsetWidth);
    const y = this.vh + Math.random() * 300;
    this.planetStates[id] = { x, y, angle: 0 };
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  private spawnShip(id: string, el: HTMLElement) {
    const edge = Math.floor(Math.random() * 4);
    let x: number, y: number;
    switch(edge) {
      case 0: x = -el.offsetWidth; y = Math.random() * this.vh; break;            // left
      case 1: x = this.vw;         y = Math.random() * this.vh; break;            // right
      case 2: x = Math.random() * this.vw; y = -el.offsetHeight;            break;  // top
      default: x = Math.random() * this.vw; y = this.vh;                      break;  // bottom
    }
    this.shipStates[id] = { x, y };
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
}