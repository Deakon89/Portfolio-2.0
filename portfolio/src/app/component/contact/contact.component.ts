import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
import { BacktoHomeComponent } from '../backto-home/backto-home.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, LoadingBarComponent, BacktoHomeComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  loading = true;
  isCalling = false; 
  whatsappNumber = '+39 328 2441109'; // inserisci il numero corretto
  message = 'Ciao, ho bisogno di informazioni!';
  
  get whatsappLink(): string {
    const encodedMessage = encodeURIComponent(this.message);
    return `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
  }
  ngOnInit(): void {
    // Simula caricamento dati: al termine (qui dopo 5s) disattiva il loader
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
  
  onCall(event: Event): void {
    event.preventDefault();       // blocca l’apertura immediata
    if (this.isCalling) return;   // evita doppi click
    this.isCalling = true;        // cambia icona
    setTimeout(() => {
      window.open(this.whatsappLink, '_blank');
      // opzionale: resetta l’icona al ritorno
      this.isCalling = false;
    }, 1000);  
  }
}
