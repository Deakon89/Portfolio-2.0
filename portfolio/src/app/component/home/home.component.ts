import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  menuVisible = true; 
  selectedIndex: number | null = null;
 
  menuItems = [
    { route : ['about'], img: 'assets/about_me_pixel.png' },
    { route : ['projects'], img: 'assets/projects_pixel.png' },
    { route : ['contact'], img: 'assets/contacts_pixel.png' },
  ];

  constructor(private router: Router) {}
ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {

        const url = e.urlAfterRedirects;
        const atHome = url === '/splash/home';
        
        this.menuVisible   = atHome;
        this.selectedIndex = atHome ? null : this.selectedIndex;
      });
  }

    onSelect(i: number, e: MouseEvent) {
    e.preventDefault();
    this.selectedIndex = i;
    setTimeout(() => {
      // naviga **relativamente** alla home
      this.router.navigate(this.menuItems[i].route, { relativeTo: this.router.routerState.root.firstChild!.firstChild! });
      this.menuVisible = false;
    }, 1000);
    
  }
}