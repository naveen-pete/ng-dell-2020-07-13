import { Injectable } from '@angular/core';

import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductsService {
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

  addProduct(newProduct: ProductModel) {
    this.products = [...this.products, newProduct];
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
