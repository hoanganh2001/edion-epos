import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'edion-top-bar',
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
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
