import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-modal',
  imports: [CommonModule],
  templateUrl: './common-modal.component.html',
  styleUrl: './common-modal.component.scss',
  standalone: true,
})
export class CommonModalComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() data?: any; // Optional data
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
