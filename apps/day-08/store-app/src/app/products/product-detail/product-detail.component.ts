import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { ProductModel } from '../../models/product.model';
import { LoggerService } from '../../common/logger.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isLoading = false;
  product: ProductModel = new ProductModel();
  id: string;

  constructor(
    private loggerService: LoggerService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          this.isLoading = true;
          this.id = paramMap.get('id');
          return this.productsService.getProduct(this.id);
        })
      )
      .subscribe(
        (product) => {
          this.product = product;
          this.isLoading = false;
        },
        (error) => {
          console.log('Get product failed.');
          console.log('Error:', error);
          this.isLoading = false;
        }
      );
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.isLoading = true;
      this.productsService.deleteProduct(this.id).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log('Delete product failed.');
          console.log('Error:', error);
          this.isLoading = false;
        }
      );
    }
  }

  onEdit() {
    this.router.navigate(['/products', this.id, 'edit']);
  }
}
