import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { CurrencyDisplayPipe } from '../../../../shared/pipes/currency-display.pipe';
import { CommonTableService } from '../../../../shared/services/common-table.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CurrencyDisplayPipe],
  standalone: true,
})
export class ProductDetailComponent implements OnChanges {

  private commonTableService = inject(CommonTableService);
  @Input() product: Product | null = null;
  @Input() tempProduct: Product | null = null;
  @Output() productCodeSelected = new EventEmitter<Product>();
  showDropdown: boolean = false; // To control dropdown visibility
  @Input() productCodes: string[] = []; // Array to hold product codes

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.product = changes['product'].currentValue;
      this.tempProduct = structuredClone(this.product)
    }
  }

  selectProductCode(code: string): void {
    this.showDropdown = true;
    if (this.product && this.tempProduct) {
      const data1 = {
        productDetails: this.tempProduct?.productDetails || null,
        productCode: structuredClone(code),
      }

      this.product = this.tempProduct
      this.commonTableService.changeProduct(data1);
      this.showDropdown = false;
    }
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  get quantity(): number | null {
    return this.product?.productDetails.quantity
      ? parseInt(this.product.productDetails.quantity)
      : null;
  }

  onUnitPriceExcludingTaxBlur(event: any): void {
    if (this.product) {
      this.product.productDetails.unitPrice = event.target.value;
    }
  }
  onDiscountBlur(event: any): void {
    if (this.product) {
      this.product.productDetails.discount = event.target.value;
    }
  }

  onUnitPriceBlur(event: any): void {
    if (this.product) {
      this.product.productDetails.unitPrice = event.target.value;
    }
  }

  onQuantityChange(event: any): void {
    if (this.product) {
      this.product.productDetails.quantity = event.target.value;
    }
  }

  setQuantity(action: 'minus' | 'add'): void {
    if (this.product) {
      if (action === 'minus') {
        const newQuantity = Math.max(
          1,
          parseInt(this.product.productDetails.quantity) - 1
        );
        this.product.productDetails.quantity = newQuantity.toString();
      } else {
        this.product.productDetails.quantity = (
          parseInt(this.product.productDetails.quantity) + 1
        ).toString();
      }
    }
  }
}
