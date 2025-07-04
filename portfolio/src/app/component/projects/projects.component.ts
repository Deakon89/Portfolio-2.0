import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
import { link } from 'node:fs';
import { BacktoHomeComponent } from '../backto-home/backto-home.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, LoadingBarComponent, BacktoHomeComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  loading = true;

    projects = [
    { title: 'RunSpechs', img: 'assets/run.png', description: 'running app', link: 'https://runspechs.netlify.app/home' },
    // { title: 'WarePulse',  img: 'assets/wp.png',  description: 'warehouse app' , link: 'https://github.com/Deakon89'},
    { title: 'Fenchina mani di carta', img: 'assets/fench.png', description: 'E-Commerce' , link: 'https://fenchinamanidicarta.netlify.app'},
    { title: 'Inchiostro', img: 'assets/inc.png', description: 'Open-library app' , link: 'https://inchiostrolibrary.netlify.app'},
    // … altri progetti …
  ];

  currentIndex = 0;

  ngOnInit(): void {
    // Simula caricamento dati: al termine (qui dopo 5s) disattiva il loader
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  } 

  prev() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }
  
    next() {
      this.currentIndex = Math.min(this.currentIndex + 1, this.projects.length - 1);
    }
}
