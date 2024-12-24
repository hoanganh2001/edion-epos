import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import data from '../../mock/data.json'; // Adjust the path to the actual location of data.json
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonTableComponent } from '../../shared/components/common-table/common-table.component';
import {
    PaginationComponent, PaginationState
} from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CommonTableComponent,
    CardComponent,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  columns = [
    { title: 'No', dataKey: 'No' },
    { title: 'Product Name', dataKey: 'ProductName' },
    { title: 'Model', dataKey: 'Model' },
    { title: 'Length', dataKey: 'Length' },
    { title: 'Quantity', dataKey: 'Quantity' },
    { title: 'Unit Price', dataKey: 'UnitPrice' },
    { title: 'Total Price', dataKey: 'TotalPrice' },
  ];
  allData = data.data;
  data: any[] = [];
  currentPage: number = 1;
  rowsPerPage: number = 10;

  onPaginationChange(state: PaginationState<any>): void {
    this.data = state.items;
    this.currentPage = state.currentPage;
    this.rowsPerPage = state.rowsPerPage;
  }
}
