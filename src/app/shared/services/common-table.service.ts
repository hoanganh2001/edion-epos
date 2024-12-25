import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { Product } from '../../pages/modules/product/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CommonTableService {
  constructor() {}

  private productSource = new BehaviorSubject<Product | null>(null);
  currentProduct = this.productSource.asObservable();

  changeProduct(product: Product) {
    console.log('55555555555555:', product);

    this.productSource.next(product);
  }
}
