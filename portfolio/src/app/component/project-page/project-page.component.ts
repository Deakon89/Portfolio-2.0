import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ProjectCardComponent } from '../project-card/project-card.component';
// import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectsPageComponent {
  // projects = [
  //   { title: 'Portfolio Website', description: 'Un sito per mostrare i miei lavori con animazioni.', image: '' },
  //   { title: 'ToDo App', description: 'Gestione delle attività quotidiane con storage locale.', image: '' },
  //   { title: 'Chat AI Clone', description: 'Replica di un’interfaccia di chat AI in tempo reale.', image: '' },
  //   { title: 'Mini Arcade', description: 'Collection di mini-giochi in JavaScript e Canvas.', image: '' }
  // ];
}