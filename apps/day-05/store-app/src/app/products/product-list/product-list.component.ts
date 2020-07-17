import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: ProductModel[];

  private subProductsChanged: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subProductsChanged = this.productsService.productsChanged.subscribe(
      products => this.products = products
    );

    this.products = this.productsService.getProducts();
  }

  onAdd() {
    this.router.navigate(['/products/new']);
  }

  ngOnDestroy() {
    if (this.subProductsChanged) {
      this.subProductsChanged.unsubscribe();
    }
  }

}
