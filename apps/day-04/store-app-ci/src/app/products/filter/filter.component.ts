import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() applyFilter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onFilterClick(event: any) {
    this.applyFilter.emit(event.target.value);
  }

}
