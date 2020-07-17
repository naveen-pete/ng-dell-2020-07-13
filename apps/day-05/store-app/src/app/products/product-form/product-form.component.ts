import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  // @Output() createProduct = new EventEmitter<ProductModel>();

  showMessage: boolean = false;
  product: ProductModel = new ProductModel();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // this.product.id = Date.now();
    // const newProduct = { ...this.product };
    // this.createProduct.emit(newProduct);

    this.productsService.addProduct(this.product);

    this.product = new ProductModel();

    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }

}
