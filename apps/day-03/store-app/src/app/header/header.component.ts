import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedItem = 'Products';

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(event: any) {
    this.selectedItem = event.target.innerText;
  }

  applyActive(item: string) {
    return this.selectedItem === item;
  }

}
