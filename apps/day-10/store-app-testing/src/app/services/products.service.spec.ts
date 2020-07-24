import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ProductsService } from "./products.service";
import { Product } from '../models/product';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
      ]
    });

    service = TestBed.get(ProductsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should ensure that the service instance is created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    const testProducts: Product[] = [
      { id: 1, name: 'p1', description: 'p1 desc', price: 10, isAvailable: true },
      { id: 2, name: 'p2', description: 'p2 desc', price: 20, isAvailable: false }
    ]

    service.getProducts().subscribe(
      (products: Product[]) => {
        console.log(products);
        expect(products.length).toBe(testProducts.length);
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toEqual('GET');
    req.flush(testProducts);
  });

  it('should create a new product', () => {
    const product: Product = {
      id: 0,
      name: 'p3',
      description: 'p3 desc',
      price: 30,
      isAvailable: true
    };

    service.addProduct(product).subscribe(
      (newProduct: Product) => {
        console.log('new product:', newProduct);

        expect(newProduct.id).toBeTruthy();
        expect(newProduct.name).toBe(product.name);
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toEqual('POST');
    req.flush({ ...product, id: 3 });
  });
});