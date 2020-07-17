import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductsService {
  // expose a custom event
  productsChanged: Subject<ProductModel[]> = new Subject<ProductModel[]>();

  private products: ProductModel[] = [
    {
      id: 1,
      name: 'iPhone X',
      description: 'A mobile phone from Apple',
      isAvailable: true,
      price: 60000
    },
    {
      id: 2,
      name: 'Samsung Galaxy Note 10',
      description: 'A mobile phone from Samsung',
      isAvailable: true,
      price: 80000
    },
    {
      id: 3,
      name: 'Google Pixel 3',
      description: 'A mobile phone from Google',
      isAvailable: false,
      price: 50000
    }
  ];

  getProducts() {
    return [...this.products];
  }

  getProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    return product;
  }

  addProduct(product: ProductModel) {
    const newProduct = {
      ...product,
      id: Date.now()
    };

    console.log('before adding:', this.products);
    this.products = [...this.products, newProduct];
    console.log('after adding:', this.products);

    // emit event
    this.productsChanged.next(this.products);
  }

  updateProduct(id, product) {
    // emit event
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);

    // emit event
    this.productsChanged.next(this.products);
  }
}
