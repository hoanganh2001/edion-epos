import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import data from '../../mock/data.json'; // Adjust the path to the actual location of data.json
import { PaginationState } from '../../shared/components/pagination/pagination.component';
import { ModalService } from '../../shared/services/modal.service';
import { ProductDetailComponent } from '../modules/product/product-detail/product-detail.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(private router: Router, private modalService: ModalService) {}

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
  navigateToSales(): void {
    this.router.navigate(['/sales']);
  }
  openModal(): void {
    this.modalService.open(ProductDetailComponent, 'large');
  }
}
