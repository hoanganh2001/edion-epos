import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { CardComponent } from '../../../../shared/components/card/card.component';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import {
  Product,
  ProductDetails,
} from '../../../modules/product/models/product.model';
import { ProductDetailComponent } from '../../product/product-detail/product-detail.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  standalone: true,
  imports: [
    CommonTableComponent,
    ProductDetailComponent,
    CardComponent,
    CommonModule,
  ],
})
export class SalesComponent implements OnInit {
  private _salesService = inject(SalesService);

  productCodesArr: string[] = [];
  data: Product[] = [];
  selectedProduct: Product | null = null;
  productCodes: string[] = [];

  columns = [
    { title: '商品名', dataKey: 'productName' as keyof ProductDetails },
    { title: '型番', dataKey: 'modelNo' as keyof ProductDetails },
    { title: '長', dataKey: 'cho' as keyof ProductDetails },
    { title: 'A', dataKey: 'aCode' as keyof ProductDetails },
    { title: 'JAN', dataKey: 'janCode' as keyof ProductDetails },
    { title: '数', dataKey: 'quantity' as keyof ProductDetails },
    { title: '単価', dataKey: 'unitPrice' as keyof ProductDetails },
    { title: '値引', dataKey: 'discount' as keyof ProductDetails },
    { title: '売価計', dataKey: 'totalPrice' as keyof ProductDetails },
    { title: '属', dataKey: 'category' as keyof ProductDetails },
    { title: '手配', dataKey: 'arrangement' as keyof ProductDetails },
    { title: 'ポイント', dataKey: 'points' as keyof ProductDetails },
  ];

  ngOnInit(): void {
    this._salesService.getSales().subscribe((response) => {
      this.data = response.map((item, index) => {
        return {
          ...item,
          productDetails: {
            ...item.productDetails,
            productName: item.productDetails.productName + ' ' + index,
          },
        };
      });
      this.productCodesArr = structuredClone(this.data.map((item) => item.productCode));
    });
  }

  getTotalPrice(): number {
    return this.data.reduce((total, item) => {
      return total + Number(item.productDetails.totalPrice || 0);
    }, 0);
  }

  onRowClick(product: Product): void {
    this.selectedProduct = product;
    this.productCodes = this.productCodesArr;
  }

}
