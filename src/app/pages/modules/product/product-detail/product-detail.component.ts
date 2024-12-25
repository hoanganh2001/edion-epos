import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { CurrencyDisplayPipe } from '../../../../shared/pipes/currency-display.pipe';
import { CommonTableService } from '../../../../shared/services/common-table.service';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CurrencyDisplayPipe],
  standalone: true,
})
export class ProductDetailComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    this.productService.currentProduct.subscribe((product) => {
      this.product = product;
    });
  }
  private productService = inject(ProductService);
  private commonTableService = inject(CommonTableService);
  @Input() product: Product | null = null;
  @Output() productCodeSelected = new EventEmitter<Product>();
  showDropdown: boolean = false; // To control dropdown visibility
  @Input() productCodes: string[] = []; // Array to hold product codes

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      console.log('product', changes['product'].currentValue);
      this.product = changes['product'].currentValue;
    }
  }

  selectProductCode(code: string): void {
    this.showDropdown = true;
    console.log('code:', code);
    if (this.product) {
      this.commonTableService.changeProduct({
        ...structuredClone(this.product),
        productCode: structuredClone(code),
      });
      this.product.productCode = code;

      // this.productService.changeProduct(this.product);
      // this.productCodeSelected.emit(this.product);
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
      this.productService.changeProduct(this.product);
    }
  }
  onDiscountBlur(event: any): void {
    if (this.product) {
      this.product.productDetails.discount = event.target.value;
      this.productService.changeProduct(this.product);
    }
  }

  onUnitPriceBlur(event: any): void {
    if (this.product) {
      this.product.productDetails.unitPrice = event.target.value;
      this.productService.changeProduct(this.product);
    }
  }

  onQuantityChange(event: any): void {
    if (this.product) {
      this.product.productDetails.quantity = event.target.value;
      this.productService.changeProduct(this.product);
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
