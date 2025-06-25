import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';


   @ViewChildren('parallaxObject', { read: ElementRef })
  objects!: QueryList<ElementRef<HTMLElement>>;

  private scrollX = 0;
  private scrollY = 0;
  private containerWidth!: number;
  private containerHeight!: number;

  ngAfterViewInit(): void {
    // Calcola dimensioni viewport
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    // Inizializza posizioni di ogni oggetto
    this.objects.forEach(obj => {
      const el = obj.nativeElement;
      el.dataset['currentX'] = el.dataset['initialLeft'] || '0';
      el.dataset['currentY'] = el.dataset['initialTop']  || '0';
      this.applyTransform(el, el.dataset['currentX']!, el.dataset['currentY']!);
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    // Accumula lo scroll orizzontale e verticale
    this.scrollX += event.deltaX;
    this.scrollY += event.deltaY;
    this.applyLoop();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;
    this.applyLoop();
  }

  private applyLoop(): void {
    this.objects.forEach(obj => {
      const el = obj.nativeElement;

      // Lettura iniziale
      const initLeft = this.parseValue(el.dataset['initialLeft']!, this.containerWidth);
      const initTop  = parseFloat(el.dataset['initialTop']!);

      // Velocità differenziate per layer
      // const speedX = el.id === 'planet1' ? 0.1 : 0.2;
      // const speedY = el.id === 'planet1' ? 0.3 : 0.6;
      const speedXLayer :{ [key: string]: number}  = {
        planet1: 0.1,
        planet2: 0.15,
        planet3: 0.2,
        planet4: 0.25,
        ship1: 0.3,
        ship2: 0.35,
        ship3: 0.4,
      };
      const speedYLayer: { [key: string]: number } = {
        planet1: 0.3,
        planet2: 0.35,
        planet3: 0.4,
        planet4: 0.45,
        ship1: 0.5,
        ship2: 0.55,
        ship3: 0.6,
      };
      const speedX = speedXLayer[el.id] || 0.2;
      const speedY = speedYLayer[el.id] || 0.6;

      // Calcola nuove posizioni
      let x = initLeft + this.scrollX * speedX;
      let y = initTop  + this.scrollY * speedY;

      // Loop orizzontale e verticale
      const elW = el.offsetWidth;
      const elH = el.offsetHeight;

      // Orizzontale
      if (x < -elW) {
        x += this.containerWidth + elW;
      } else if (x > this.containerWidth) {
        x -= this.containerWidth + elW;
      }
      // Verticale
      if (y < -elH) {
        y += this.containerHeight + elH;
      } else if (y > this.containerHeight) {
        y -= this.containerHeight + elH;
      }

      // Applica e salva
      this.applyTransform(el, `${x}px`, `${y}px`);
      el.dataset['currentX'] = x.toString();
      el.dataset['currentY'] = y.toString();
    });
  }

  // Helper: trasforma percentuali in px o lascia px
  private parseValue(val: string, max: number): number {
    return val.includes('%')
      ? (parseFloat(val) / 100) * max
      : parseFloat(val);
  }

  // Imposta transform CSS
  private applyTransform(el: HTMLElement, x: string, y: string): void {
    el.style.transform = `translate(${x}, ${y})`;
  }

  // @ViewChildren('parallaxObject', { read: ElementRef })
  // objects!: QueryList<ElementRef<HTMLElement>>;

  // private virtualScroll = 0;
  // private containerHeight!: number;

  // ngAfterViewInit(): void {
  //   // Qui window è definito
  //   this.containerHeight = window.innerHeight;

  //   this.objects.forEach(obj => {
  //     const el = obj.nativeElement;
  //     // Accesso dataset con index signature
  //     const initialTop = parseFloat(el.dataset['initialTop'] || '0');
  //     el.dataset['currentTop'] = initialTop.toString();
  //     // Imposta posizione iniziale
  //     el.style.transform = `translateY(${initialTop}px)`;
  //   });
  // }

  // @HostListener('window:wheel', ['$event'])
  // onWheel(event: WheelEvent): void {
  //   event.preventDefault();
  //   this.virtualScroll += event.deltaY;
  //   this.applyLooping();
  // }

  // @HostListener('window:resize')
  // onResize(): void {
  //   this.containerHeight = window.innerHeight;
  // }

  // private applyLooping(): void {
  //   this.objects.forEach(obj => {
  //     const el = obj.nativeElement;
  //     const init = parseFloat(el.dataset['initialTop']!);
  //     let current = parseFloat(el.dataset['currentTop']!);

  //     // Calcola nuova posizione con profondità variabile
  //     const speed = el.id === 'planet1' ? 0.3 : 0.6;
  //     current = init + this.virtualScroll * speed;

  //     // Loop verticale
  //     const elHeight = el.offsetHeight;
  //     if (current < -elHeight) {
  //       current += this.containerHeight + elHeight;
  //     } else if (current > this.containerHeight) {
  //       current -= this.containerHeight + elHeight;
  //     }

  //     el.style.transform = `translateY(${current}px)`;
  //     el.dataset['currentTop'] = current.toString();
  //   });
  // }
}