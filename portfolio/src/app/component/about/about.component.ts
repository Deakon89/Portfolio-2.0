import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LoadingBarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  loading = true;
  showEnglish = false;
  showContacts = false; 

  ngOnInit(): void {
    // Simula caricamento dati: al termine (qui dopo 5s) disattiva il loader
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

   toggleLang() {
    this.showEnglish = !this.showEnglish;
  }

   togglePage() {
    this.showContacts = !this.showContacts;
  }
}
