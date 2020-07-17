import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

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
  product: ProductModel = new ProductModel();
  id: number;

  constructor(
    private loggerService: LoggerService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (map) => {
        this.id = +map.get('id');
        this.product = this.productsService.getProduct(this.id);

        console.log('name:', map.get('name'));
      }
    );
  }

  onDelete(id: number) {
    this.productsService.deleteProduct(id);
  }

  onEdit(product: ProductModel) {
    this.loggerService.log('ProductDetailComponent.onEdit() - emitting \'editProduct\' event');
    this.editProduct.emit(product);
  }
}
