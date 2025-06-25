import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, LoadingBarComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    // Simula caricamento dati: al termine (qui dopo 5s) disattiva il loader
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
