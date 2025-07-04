import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-tech-ticker',
  imports: [CommonModule],
  templateUrl: './tech-ticker.component.html',
  styleUrls: ['./tech-ticker.component.css']
})
export class TechTickerComponent {
  // Array con tutti i linguaggi e le tecnologie
    // La lista delle tecnologie
  techs: string[] = [
    'Angular', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'Spring Boot',
    'HTML5', 'CSS3', 'SCSS',
    'Git', 'Docker', 'Python',
    'Java', 'React', 'Bootstrap','Tailwind'
  ];

  // Frase unica, ripetuta per garantire continuità
  tickerText = this.techs.join(' • ') + ' • ';
}
