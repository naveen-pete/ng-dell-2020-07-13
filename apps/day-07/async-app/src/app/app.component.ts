import { Component, OnInit } from '@angular/core';

import { doWork } from './cb';
// import { doWork } from './promise';
// import { doWork } from './observable';
// import { doWork } from './async-await';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'async-app';

  ngOnInit() {
    console.log('begin');
    doWork();
    console.log('end');
  }

}
