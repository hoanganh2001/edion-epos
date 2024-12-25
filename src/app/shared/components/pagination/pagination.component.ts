import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export type PaginationType =
  | 'simple'
  | 'full'
  | 'compact'
  | 'minimal'
  | 'japanese'
  | 'short';

export interface PaginationState<T> {
  items: T[];
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  protected readonly Math = Math;

  // Inputs
  @Input() items: any[] = [];
  @Input() paginationType: PaginationType = 'full';
  @Input() rowsPerPageOptions = [5, 10, 20, 50];
  @Input() rowsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;

  // Chuyển totalPages và totalItems thành getter để tính toán động
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.rowsPerPage);
  }

  // get totalItems(): number {
  //   return this.items.length;
  // }

  @Output() paginationChange = new EventEmitter<PaginationState<any>>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializePagination();
  }

  private initializePagination(): void {
    this.emitPaginationEvent();
  }

  get displayedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = Math.min(startIndex + this.rowsPerPage, this.totalItems);
    return this.items.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.emitPaginationEvent();
    }
  }

  onRowsPerPageChange(value: number): void {
    this.rowsPerPage = value;
    this.emitPaginationEvent();
    this.cdr.detectChanges();
  }

  private emitPaginationEvent(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = Math.min(startIndex + this.rowsPerPage, this.totalItems);

    this.paginationChange.emit({
      items: this.displayedItems,
      currentPage: this.currentPage,
      rowsPerPage: this.rowsPerPage,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
      startIndex,
      endIndex,
    });
  }

  // Thêm các getters để kiểm tra
  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
