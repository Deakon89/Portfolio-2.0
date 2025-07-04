import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-orientation-alert',
  imports: [CommonModule],
  templateUrl: './orientation-alert.component.html',
  styleUrls: ['./orientation-alert.component.css']
})
export class OrientationAlertComponent implements OnInit {
  isLandscape = false;

  // Rileva se il dispositivo è mobile
  private isMobile(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  ngOnInit(): void {
    this.checkOrientation();
  }

  // Riascolta resize e orientationchange
  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onResizeOrOrientationChange(): void {
    this.checkOrientation();
  }

  private checkOrientation(): void {
    if (!this.isMobile()) {
      this.isLandscape = false;
      return;
    }
    // Se disponibile, usa ScreenOrientation API
    if ('orientation' in screen) {
      this.isLandscape = (screen.orientation.type.startsWith('landscape'));
    } else {
      // Fallback: confronto width/height
      this.isLandscape = window.innerWidth > window.innerHeight;
    }
  }
}
