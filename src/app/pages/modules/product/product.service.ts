import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productSource = new BehaviorSubject<Product | null>(null);
  currentProduct = this.productSource.asObservable();

  changeProduct(product: Product) {
    this.productSource.next(product);
  }
}
