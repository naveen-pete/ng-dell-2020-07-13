import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductsService } from '../services/products.service';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;
  let el: DebugElement;
  let productsServiceSpy: any;
  let productsService: any;

  beforeEach(() => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts', 'deleteProduct']);

    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    productsService = TestBed.get(ProductsService);
  });

  xit('should create an instance of the component', () => {
    expect(component).toBeTruthy();
    expect(el).toBeTruthy();
  });

  xit('should show the products', () => {
    const testProducts = [
      { id: 1, name: 'p1', description: 'p1 desc', price: 10, isAvailable: true },
      { id: 2, name: 'p2', description: 'p2 desc', price: 20, isAvailable: false }
    ];

    productsService.getProducts.and.returnValue(of(testProducts));

    fixture.detectChanges();

    expect(component.products.length).toBe(testProducts.length);
    expect(el.queryAll(By.css('tr.data-row')).length).toBe(testProducts.length);
  });

  it('should delete a product', () => {
    const testProducts = [
      { id: 1, name: 'p1', description: 'p1 desc', price: 10, isAvailable: true },
      { id: 2, name: 'p2', description: 'p2 desc', price: 20, isAvailable: false }
    ];

    productsService.getProducts.and.returnValue(of(testProducts));
    productsService.deleteProduct.and.returnValue(of(''));
    spyOn(window, 'confirm').and.returnValue(true);

    fixture.detectChanges();

    // console.log(el.queryAll(By.css('#deleteLink')).length);
    const links = el.queryAll(By.css('#deleteLink'));

    // simulate click event on the second delete link
    links[1].triggerEventHandler('click', null);
    // links[1].nativeElement.click();

    expect(productsService.deleteProduct).toHaveBeenCalledWith(2);
  });
});