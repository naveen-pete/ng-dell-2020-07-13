import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductsService {
  apiUrl = 'https://test-project-453c6.firebaseio.com/store-app/products';
  productsChanged: Subject<ProductModel[]> = new Subject<ProductModel[]>();

  private products: ProductModel[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}.json`)
      .pipe(
        map(responseData => {
          if (!responseData) {
            return [];
          }

          const products: ProductModel[] = [];
          const keys = Object.keys(responseData);

          keys.forEach(key => {
            const product: ProductModel = {
              ...responseData[key],
              id: key
            };

            products.push(product);
          });

          return products;
        }),
        tap(products => this.products = products)
      )
  }

  getProduct(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}.json`)
      .pipe(
        map((responseData: any) => {
          const product: ProductModel = {
            ...responseData,
            id
          };
          return product;
        })
      );
  }

  addProduct(product: ProductModel): Observable<any> {
    return this.http.post(`${this.apiUrl}.json`, product)
      .pipe(
        tap((responseData: any) => {
          const newProduct: ProductModel = {
            ...product,
            id: responseData.name
          };
          this.products = [...this.products, newProduct];

          // emit event
          this.productsChanged.next(this.products);
        })
      );
  }

  updateProduct(id: string, product: ProductModel): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}.json`, product)
      .pipe(
        tap((responseData: any) => {
          const updatedProduct: ProductModel = {
            ...responseData,
            id
          };
          this.products = this.products.map(
            p => p.id === id ? updatedProduct : p
          );

          // emit event
          this.productsChanged.next(this.products);
        })
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}.json`)
      .pipe(
        tap(() => {
          this.products = this.products.filter(p => p.id !== id);

          // emit event
          this.productsChanged.next(this.products);
        })
      );
  }
}
