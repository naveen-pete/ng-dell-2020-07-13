import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [
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

  constructor() { }

  ngOnInit(): void {
  }

  onProductCreated(newProduct: ProductModel) {
    this.products.unshift(newProduct);
  }

  onDeleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  onEditProduct(product: ProductModel) {
    console.log('ProductsComponent.onEditProduct() handler:', product);
  }

}
