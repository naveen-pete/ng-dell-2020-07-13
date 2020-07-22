import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../products.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  isLoading = false;
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

    this.isLoading = true;
    this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.isLoading = false;
      },
      (error: any) => {
        console.log('Get products failed.');
        console.log('Error:', error.message);
        this.isLoading = false;
      }
    );
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
