import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Product,
  ProductDetails,
} from '../../../pages/modules/product/models/product.model';
import { CommonTableService } from '../../../shared/services/common-table.service';
import {
  PaginationComponent,
  PaginationState,
} from '../pagination/pagination.component';

@Component({
  selector: 'app-common-table',
  imports: [CommonModule, PaginationComponent, FormsModule],
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  standalone: true,
})
export class CommonTableComponent implements OnChanges, OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private commonTableService: CommonTableService
  ) {}

  @Input() columns: { title: string; dataKey: keyof ProductDetails }[] = [];
  @Input() data: Product[] = [];

  @Output() dropdownChange = new EventEmitter<{
    rowIndex: number;
    value: string;
  }>();

  @Output() rowClick = new EventEmitter<Product>();

  @Input() actionColumn: boolean = false;

  availableActions = ['Edit', 'Delete', 'View'];

  @Input() itemsPerPage: number = 5;
  currentPage: number = 1;

  selectedRowIndex: number | null = null;

  selectedStatus: string = 'delivery';

  @Input() selectedProduct: Product | null = null;

  ngOnInit(): void {
    this.commonTableService.currentProduct.subscribe((product) => {
      this.selectedProduct =
        this.data.find((item) => item.productCode === product?.productCode) ||
        null;
      this.rowClick.emit(
        this.selectedProduct !== null ? this.selectedProduct : undefined
      );
      this.selectedRowIndex = this.data.findIndex(
        (item) => item.productCode === product?.productCode
      );
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
    }
    if (changes['columns']) {
      this.columns = changes['columns'].currentValue;
    }
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  }

  onPageChange(event: PaginationState<any>) {
    this.currentPage = event.currentPage;
    this.itemsPerPage = event.rowsPerPage;
    this.selectedRowIndex = null;
    this.cdr.detectChanges();
  }

  getTotalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  onDropdownChange(rowIndex: number, value: string) {
    this.dropdownChange.emit({ rowIndex, value });
  }

  onRowClick(row: Product, index: number): void {
    this.selectedRowIndex = index;
    this.rowClick.emit(row);
  }

  getTotalPrice(): number {
    return this.data.reduce((total, item) => {
      return total + Number(item.productDetails.totalPrice || 0);
    }, 0);
  }
  onStatusChange(event: any) {
    console.log(event.target.value);
  }
}
