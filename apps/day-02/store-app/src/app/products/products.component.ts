import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productName: string = 'iPhone X';
  productPrice: number = 50000;
  productIsAvailable: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    console.log('Product saved.');
  }

  onSearch(event) {
    console.log('You entered:', event.target.value);
  }

}
