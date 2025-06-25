import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, LoadingBarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    // Simula caricamento dati: al termine (qui dopo 5s) disattiva il loader
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
