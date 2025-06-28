import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-backto-home',
  imports: [RouterModule],
  templateUrl: './backto-home.component.html',
  styleUrl: './backto-home.component.css'
})
export class BacktoHomeComponent {

  constructor(private router: Router) { }

  goBack(): void {
    this.router.navigate(['/splash/home']);
  }
}
