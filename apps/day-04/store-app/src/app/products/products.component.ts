import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model';
import { LoggerService } from '../common/logger.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(
    private loggerService: LoggerService,
    private productsService: ProductsService
  ) {
    // this.products = this.productsService.getProducts();
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onProductCreated(newProduct: ProductModel) {
    this.products.unshift(newProduct);
  }

  onDeleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  onEditProduct(product: ProductModel) {
    this.loggerService.log('ProductsComponent.onEditProduct() handler');
  }

}
