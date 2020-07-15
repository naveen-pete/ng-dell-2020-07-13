import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  today = Date.now();

  // product: ProductModel = new ProductModel();

  // product: ProductModel = new ProductModel(1, 'iPhone XR', 'Smart phone from Apple', 65000, true);

  // product: ProductModel = {
  //   id: 1,
  //   name: 'iPhone XR',
  //   description: 'Smart phone from Apple',
  //   price: 65000,
  //   isAvailable: true
  // };

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

}
