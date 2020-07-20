import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { ProductModel } from '../../models/product.model';
import { LoggerService } from '../../common/logger.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: ProductModel = new ProductModel();
  id: number;

  constructor(
    private loggerService: LoggerService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      map => {
        this.id = +map.get('id');
        this.product = this.productsService.getProduct(this.id);
      }
    );
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.productsService.deleteProduct(this.id);
      this.router.navigate(['/products']);
    }
  }

  onEdit() {
    this.router.navigate(['/products', this.id, 'edit']);
  }
}
