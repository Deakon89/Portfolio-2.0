import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'app-splash',
  imports: [CommonModule,RouterOutlet ],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {
  homeVisible = false;
  clicked = false;
  imageIndex = 0;
  images = ['assets/avatarZZZ.png', 'assets/avatarWOW.png', 'assets/avatarD.png', 'assets/avatar.png'];

  constructor( private router: Router ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        // se torno all’URL base /splash (senza /home)
        if (e.url === '/splash') {
          this.resetSplash();
        }
      });
  }

   handleClick(): void {
    if (this.clicked) {
      return;
    }
    this.clicked = true;
    this.imageIndex = this.imageIndex === 1? 0 : 1;
    setInterval(() => {
      this.imageIndex = this.imageIndex === 2? 2:2; 
      setInterval(() => {
      this.imageIndex = this.imageIndex === 3? 3:3;
    } , 2000);
    } , 1000);
    if (this.homeVisible = true){
    this.router.navigate(['/splash/home']);
  }else{
    this.homeVisible = false;
  }
}

private resetSplash(): void {
    // rimuove la classe .changed, nasconde il router-outlet
    this.clicked = false;
    this.homeVisible = false;
  }

// onAnimationEnd(event: AnimationEvent) {
//   // quando finisce la keyframe “slide”
//   if (event.animationName === 'slide') {
    
//   }
// }
}
