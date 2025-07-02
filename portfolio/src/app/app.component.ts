// import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';

// import { RouterOutlet } from '@angular/router';



// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements AfterViewInit {
//   title = 'portfolio';


//    @ViewChildren('parallaxObject', { read: ElementRef })
//   objects!: QueryList<ElementRef<HTMLElement>>;

//   private scrollX = 0;
//   private scrollY = 0;
//   private containerWidth!: number;
//   private containerHeight!: number;

//   ngAfterViewInit(): void {
//     // Calcola dimensioni viewport
//     this.containerWidth = window.innerWidth;
//     this.containerHeight = window.innerHeight;

//     // Inizializza posizioni di ogni oggetto
//     this.objects.forEach(obj => {
//       const el = obj.nativeElement;
//       el.dataset['currentX'] = el.dataset['initialLeft'] || '0';
//       el.dataset['currentY'] = el.dataset['initialTop']  || '0';
//       this.applyTransform(el, el.dataset['currentX']!, el.dataset['currentY']!);
//     });
//   }

//   @HostListener('window:wheel', ['$event'])
//   onWheel(event: WheelEvent): void {
//     event.preventDefault();
//     // Accumula lo scroll orizzontale e verticale
//     this.scrollX += event.deltaX;
//     this.scrollY += event.deltaY;
//     this.applyLoop();
//   }

//   @HostListener('window:resize')
//   onResize(): void {
//     this.containerWidth = window.innerWidth;
//     this.containerHeight = window.innerHeight;
//     this.applyLoop();
//   }

//   private applyLoop(): void {
//     this.objects.forEach(obj => {
//       const el = obj.nativeElement;

//       // Lettura iniziale
//       const initLeft = this.parseValue(el.dataset['initialLeft']!, this.containerWidth);
//       const initTop  = parseFloat(el.dataset['initialTop']!);

//       const speedXLayer :{ [key: string]: number}  = {
//         planet1: 0.1,
//         planet2: 0.15,
//         planet3: 0.2,
//         planet4: 0.25,
//         ship1: 0.3,
//         ship2: 0.35,
//         ship3: 0.4,
//       };
//       const speedYLayer: { [key: string]: number } = {
//         planet1: 0.3,
//         planet2: 0.35,
//         planet3: 0.4,
//         planet4: 0.45,
//         ship1: 0.5,
//         ship2: 0.55,
//         ship3: 0.6,
//       };
//       const speedX = speedXLayer[el.id] || 0.2;
//       const speedY = speedYLayer[el.id] || 0.6;

//       // Calcola nuove posizioni
//       let x = initLeft + this.scrollX * speedX;
//       let y = initTop  + this.scrollY * speedY;

//       // Loop orizzontale e verticale
//       const elW = el.offsetWidth;
//       const elH = el.offsetHeight;

//       // Orizzontale
//       if (x < -elW) {
//         x += this.containerWidth + elW;
//       } else if (x > this.containerWidth) {
//         x -= this.containerWidth + elW;
//       }
//       // Verticale
//       if (y < -elH) {
//         y += this.containerHeight + elH;
//       } else if (y > this.containerHeight) {
//         y -= this.containerHeight + elH;
//       }

//       // Applica e salva
//       this.applyTransform(el, `${x}px`, `${y}px`);
//       el.dataset['currentX'] = x.toString();
//       el.dataset['currentY'] = y.toString();
//     });
//   }

//   // Helper: trasforma percentuali in px o lascia px
//   private parseValue(val: string, max: number): number {
//     return val.includes('%')
//       ? (parseFloat(val) / 100) * max
//       : parseFloat(val);
//   }

//   // Imposta transform CSS
//   private applyTransform(el: HTMLElement, x: string, y: string): void {
//     el.style.transform = `translate(${x}, ${y})`;
//   }


// }

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

interface Layer { id: string; speedY: number; speedX?: number; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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