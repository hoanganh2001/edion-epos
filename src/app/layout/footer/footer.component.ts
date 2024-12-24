import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'edion-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Output() backClicked = new EventEmitter<void>();
  @Output() clearClicked = new EventEmitter<void>();
  @Output() saveClicked = new EventEmitter<void>();
  @Output() confirmClicked = new EventEmitter<void>();

  onBackClick() {
    this.backClicked.emit();
  }

  onClearClick() {
    this.clearClicked.emit();
  }

  onSaveClick() {
    this.saveClicked.emit();
  }

  onConfirmClick() {
    this.confirmClicked.emit();
  }
}
