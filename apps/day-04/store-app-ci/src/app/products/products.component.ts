import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  availableFilter = 'all';
  filteredProducts: ProductModel[] = [];

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
    this.filterProducts();
  }

  onCreateProduct(newProduct: ProductModel) {
    this.products.unshift(newProduct);
    this.filterProducts();
  }

  onDeleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.filterProducts();
  }

  onEditProduct(product: ProductModel) {
    console.log('ProductsComponent.onEditProduct() handler:', product);
  }

  onApplyFilter(filter: string) {
    this.availableFilter = filter;
    this.filterProducts();
  }

  private filterProducts() {
    switch (this.availableFilter) {
      case 'available':
        this.filteredProducts = this.products.filter(p => p.isAvailable);
        break;

      case 'notAvailable':
        this.filteredProducts = this.products.filter(p => !p.isAvailable);
        break;

      default:
        this.filteredProducts = this.products;
    }
  }

}
