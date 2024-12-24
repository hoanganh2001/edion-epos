import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[trim],textarea[trim]',
  standalone: true, // Added to make it a standalone directive
})
export class TrimValueDirective {
  // eslint-disable-next-line no-unused-vars
  constructor(private control: NgControl) {}

  @HostListener('blur', ['$event.target'])
  _onKeyUp(element: HTMLInputElement) {
    const inputType = element.type;
    if (inputType && (inputType === 'text' || inputType === 'textarea')) {
      if (this.control.control) {
        this.control.control.setValue(
          element && element.value && element.value.trim()
        );
      }
    }
  }
}
