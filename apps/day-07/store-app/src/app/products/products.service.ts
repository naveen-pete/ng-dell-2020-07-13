import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductsService {
  apiUrl = 'https://store-app-24ac4.firebaseio.com/store-app/products';
  // expose a custom event
  productsChanged: Subject<ProductModel[]> = new Subject<ProductModel[]>();

  private products: ProductModel[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}.json`)
      .pipe(
        map((responseData: any) => {
          if (!responseData) {
            return [];
          }

          const products: ProductModel[] = [];
          const keys = Object.keys(responseData);
          keys.forEach((key) => {
            const product: ProductModel = {
              ...responseData[key],
              id: key
            };
            products.push(product);
          })
          return products;
        }),
        tap((products) => {
          this.products = [...products];
        })
      );
  }

  getProduct(id: string) {
    // return this.http.get<ProductModel>(`${this.apiUrl}/${id}.json`);
    const product = this.products.find(p => p.id === id);
    return product;
  }

  addProduct(product: ProductModel) {
    return this.http.post<any>(`${this.apiUrl}.json`, product)
      .pipe(
        tap((responseData: any) => {
          const newProduct = {
            ...product,
            id: responseData.name
          };

          this.products = [...this.products, newProduct];

          // emit event
          this.productsChanged.next(this.products);
        })
      );
  }

  updateProduct(id: string, product: ProductModel) {
    const updatedProduct = {
      ...product,
      id: id
    };
    this.products = this.products.map(
      p => p.id === id ? updatedProduct : p
    );

    // emit event
    this.productsChanged.next(this.products);
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(p => p.id !== id);

    // emit event
    this.productsChanged.next(this.products);
  }
}
