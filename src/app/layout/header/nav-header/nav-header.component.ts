import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Debounce } from '../../../shared/decorators/debounce.decorator';
import { StaffService } from '../../../shared/services/staff.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'edion-nav-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300),
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class NavHeaderComponent implements OnInit {
  salesPerson: string = '';
  cashier: string = '';
  cashierName: string = '';
  salesPersonName: string = '';

  fixedCode = '1111';

  @ViewChild('cashierInput') cashierInput!: ElementRef;

  constructor(
    private staffService: StaffService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  @Debounce(500)
  onCashierChange(event: string) {
    this.staffService.getStaff(event).subscribe((staff) => {
      console.log('event:', event);
      console.log(event != this.fixedCode);

      if (event != this.fixedCode) {
        console.log(111111111111);

        this.notificationService.showError('販売担当者IDは固定です');
        return;
      }
      this.cashierName = staff[0].name;
    });
  }

  @Debounce(500)
  onSalesPersonChange(event: string) {
    this.staffService.getStaff(event).subscribe((staff) => {
      console.log('event:', event);
      console.log(event != this.fixedCode);
      if (event != this.fixedCode) {
        this.notificationService.showError('販売担当者IDは固定です');
        return;
      }
      this.salesPersonName = staff[0].name;

      this.cashierInput.nativeElement.focus();
    });
  }
}
