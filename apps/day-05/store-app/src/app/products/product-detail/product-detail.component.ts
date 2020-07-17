import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { LoggerService } from '../../common/logger.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Output() editProduct = new EventEmitter<ProductModel>();
  @Input() product: ProductModel;

  constructor(
    private loggerService: LoggerService,
    private productsService: ProductsService
  ) {
  }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.productsService.deleteProduct(id);
  }

  onEdit(product: ProductModel) {
    this.loggerService.log('ProductDetailComponent.onEdit() - emitting \'editProduct\' event');
    this.editProduct.emit(product);
  }
}
