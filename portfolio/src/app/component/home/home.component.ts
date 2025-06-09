import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

showSplash: boolean = true;

  // URL immagine iniziale (splash 1)
  currentImage: string = 'assets/avatarZZZ.png';

  // URL seconda immagine (quella su cui “saltare”)
  secondImage: string = 'assets/avatarWOW.png';

  // URL terza immagine (quella finale, che rimane in Home)
  finalImage: string = 'assets/avatarD.png';

  // Flag per gestire l’animazione di salto
  isJumping: boolean = false;

  // Flag che segnala che siamo passati alla Home (per attivare logo-final-start e menu-enter)
  homeAnimationStarted: boolean = false;
  menuAnimationStarted: boolean = false;

  ngOnInit(): void {
    // All’avvio dell’applicazione, l’immagine pulsa (classe .pulse in HTML)
  }

  onSplashClick(): void {
    if (this.isJumping) {
      return; // Ignoriamo doppi click durante animazione
    }

    // 1) Disabilito la pulsazione
    this.isJumping = true;

    // 2) Faccio un leggero fade-out per mascherare il cambio di src,
    //    usando la classe CSS .changed (che abbassa opacity) + .show (per il fade-in)
    //    In alternativa, si può semplicemente sostituire `src` e contare
    //    sulla transizione su opacity che ho in .splash-logo.changed
    const imgElem = document.querySelector('.splash-logo') as HTMLImageElement;
    if (imgElem) {
      // passo a opacity 0
      imgElem.classList.add('changed');
      setTimeout(() => {
        // cambio src dopo 300ms (durata fade). A questo punto l’opacità è 0
        this.currentImage = this.secondImage;

        // riporto l’opacità a 1 (fade-in)
        imgElem.classList.add('show');
      }, 300);
    }

    // 3) Applico la classe .jump per l’animazione salto (0.5s)
    setTimeout(() => {
      // assicuro che .jump sia presente (subito dopo cambiamento src)
      this.isJumping = true;

      // Terminata l’animazione “jump” (0.5s), passo ad aprire la Home
      setTimeout(() => {
        this.transitionToHome();
      }, 500);
    }, 300);
  }

  private transitionToHome(): void {
    // 1) Nascondo lo splash completely
    this.showSplash = false;

    // 2) Aggiorno l’immagine a “finalImage” (quella che resta in Home)
    this.currentImage = this.finalImage;

    // 3) Dopo un tick, lancio le animazioni per logo e menu
    //    (in modo che il DOM si sia già aggiornato su Home)
    setTimeout(() => {
      //  this.homeAnimationStarted = true;
       this.menuAnimationStarted = true;
    }, 50);
  }
}