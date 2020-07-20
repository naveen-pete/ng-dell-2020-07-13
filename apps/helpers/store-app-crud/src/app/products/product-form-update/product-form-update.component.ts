import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from '../products.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html',
  styleUrls: ['./product-form-update.component.css']
})
export class ProductFormUpdateComponent implements OnInit {
  product: ProductModel = new ProductModel();
  id: string;
  isLoading = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          this.isLoading = true;
          this.id = paramMap.get('id');
          return this.productsService.getProduct(this.id);
        })
      ).subscribe(
        product => {
          this.product = product;
          this.isLoading = false;
        },
        error => {
          console.log('Get product failed.');
          console.log('Error:', error.message);
          this.isLoading = false;
        }
      );
  }

  onSaveProduct(product: ProductModel) {
    this.isLoading = true;
    this.productsService.updateProduct(this.id, product)
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/products', this.id]);
        },
        error => {
          console.log('Update product failed.');
          console.log('Error:', error.message);
          this.isLoading = false;
        }
      );
  }

}
