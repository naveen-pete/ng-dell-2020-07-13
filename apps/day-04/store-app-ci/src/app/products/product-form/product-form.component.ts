import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Output() productCreated = new EventEmitter<ProductModel>();

  showMessage: boolean = false;
  product: ProductModel = new ProductModel();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.product.id = Date.now();

    const newProduct = { ...this.product };
    this.productCreated.emit(newProduct);

    this.product = new ProductModel();

    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }

}
