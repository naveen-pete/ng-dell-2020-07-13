import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductModel } from '../models/product.model';
import { LoggerService } from '../common/logger.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  private productsChangedSub: Subscription;

  constructor(
    private loggerService: LoggerService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    // subscribe to products changed event (from ProductsService)
    this.productsChangedSub = this.productsService.productsChanged.subscribe((products: ProductModel[]) => {
      this.products = products;
      console.log('updated products:', products);
    });

    this.products = this.productsService.getProducts();
  }

  onEditProduct(product: ProductModel) {
    this.loggerService.log('ProductsComponent.onEditProduct() handler');
    this.loggerService.log(product);
  }

  ngOnDestroy() {
    if (this.productsChangedSub) {
      this.productsChangedSub.unsubscribe();
    }
  }

}
