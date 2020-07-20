import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('productForm') form: NgForm;
  @Input() product: ProductModel = new ProductModel();
  @Input() mode: string = 'Create';
  @Output() saveProduct = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    if (!this.form.valid) {
      return;
    }
    this.saveProduct.emit(this.form.value);
  }

}
