import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();
  @Input() mode: string = 'Create';
  @Output() saveProduct = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    this.saveProduct.emit(this.product);
  }

}
