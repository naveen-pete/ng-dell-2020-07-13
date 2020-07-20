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
    },
    {
      id: 4,
      name: 'Asus Zenfone',
      description: 'A mobile phone from Asus',
      isAvailable: false,
      price: 50000
    }
  ];

  getProducts() {
    return [...this.products];
  }

  getProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    return { ...product };
  }

  addProduct(product: ProductModel) {
    const newProduct = {
      ...product,
      id: Date.now()
    };

    this.products = [...this.products, newProduct];

    // emit event
    this.productsChanged.next(this.products);
  }

  updateProduct(id: number, product: ProductModel) {
    const updatedProduct = { ...product };
    this.products = this.products.map(
      p => p.id === id ? updatedProduct : p
    );

    // emit event
    this.productsChanged.next(this.products);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);

    // emit event
    this.productsChanged.next(this.products);
  }
}
