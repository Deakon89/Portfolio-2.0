import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';



@Component({
  selector: 'app-home',
  imports: [CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  clicked = false;
  imageIndex = 0;
  images = ['assets/avatarZZZ.png', 'assets/avatarWOW.png', 'assets/avatarD.png', 'assets/avatar.png'];

  handleClick(): void {
    if (this.clicked) {
      return;
    }
    this.clicked = !this.clicked;
    this.imageIndex = this.imageIndex === 1? 0 : 1;
    setInterval(() => {
      this.imageIndex = this.imageIndex === 2? 2:2; 
      setInterval(() => {
      this.imageIndex = this.imageIndex === 3? 3:3;
    } , 2000);
    } , 1000);
   
    
  }
}