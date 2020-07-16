import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-display',
  templateUrl: './filter-display.component.html',
  styleUrls: ['./filter-display.component.css']
})
export class FilterDisplayComponent implements OnInit {
  @Input() filterValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  getFilterText() {
    switch (this.filterValue) {
      case 'available':
        return 'Show available products.';

      case 'notAvailable':
        return 'Show products that are not available.';

      default:
        return 'Show all products.';
    }
  }

}
