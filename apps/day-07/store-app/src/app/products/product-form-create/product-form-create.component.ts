import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../products.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-form-create',
  templateUrl: './product-form-create.component.html',
  styleUrls: ['./product-form-create.component.css']
})
export class ProductFormCreateComponent implements OnInit {
  product: ProductModel = new ProductModel();

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSaveProduct(product: ProductModel) {
    this.productsService.addProduct(product).subscribe(
      (responseData: any) => {
        console.log('Add product successful.');
        console.log('responseData:', responseData);
        this.router.navigate(['/products']);
      },
      (error: any) => {
        console.log('Add product failed.');
        console.log('Error:', error.message);
      }
    );
  }

}
