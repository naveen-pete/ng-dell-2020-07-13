import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductModel } from 'src/app/models/product.model';
import { LoggerService } from 'src/app/common/logger.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Output() editProduct = new EventEmitter<ProductModel>();
  @Output() deleteProduct = new EventEmitter<number>();
  @Input() product: ProductModel;

  private loggerService: LoggerService;

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
  }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.deleteProduct.emit(id);
  }

  onEdit(product: ProductModel) {
    this.loggerService.log('ProductDetailComponent.onEdit() - emitting event');
    this.editProduct.emit(product);
  }
}
