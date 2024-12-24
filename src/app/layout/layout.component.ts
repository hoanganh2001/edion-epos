import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavHeaderComponent } from './header/nav-header/nav-header.component';
import { NavMenuComponent } from './header/nav-menu/nav-menu.component';
import { TopBarComponent } from './header/top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    TopBarComponent,
    NavHeaderComponent,
    NavMenuComponent,
    FooterComponent,
  ],
})
export class LayoutComponent {
  currentDate: Date = new Date();
  currentTime: string = new Date().toLocaleTimeString();

  constructor() {
    setInterval(() => {
      this.currentTime = this.formatTime(new Date());
    }, 1000); // Update time every second
  }

  private formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    };
    return date.toLocaleTimeString([], options);
  }
}
