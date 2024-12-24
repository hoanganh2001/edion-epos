import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-table',
  imports: [CommonModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
  standalone: true,
})
export class CommonTableComponent {
  @Input() columns: {
    index?: number;
    title: string;
    dataKey: string;
    options?: string[];
  }[] = [];
  @Input() data: any[] = [];
  @Output() dropdownChange = new EventEmitter<{
    rowIndex: number;
    value: string;
  }>();

  availableActions = ['Edit', 'Delete', 'View']; // Example actions

  onDropdownChange(rowIndex: number, value: string) {
    this.dropdownChange.emit({ rowIndex, value });
  }

  getTotalPrice(): number {
    return this.data.reduce((total, row) => {
      const price = row.price;
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  }

  getDropdownValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }
}
