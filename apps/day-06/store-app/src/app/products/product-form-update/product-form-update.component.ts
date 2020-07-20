import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../products.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html',
  styleUrls: ['./product-form-update.component.css']
})
export class ProductFormUpdateComponent implements OnInit {
  product: ProductModel = new ProductModel();
  id: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      map => {
        this.id = +map.get('id');
        this.product = this.productsService.getProduct(this.id);
      }
    );
  }

  onSaveProduct(product: ProductModel) {
    this.productsService.updateProduct(this.id, product);
    this.router.navigate(['/products', this.id]);
  }

}
