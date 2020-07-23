import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedUrl = '/';
  isAuthenticated = false;

  subRouteEvents: Subscription;
  subUser: Subscription

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subRouteEvents = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.selectedUrl = e.url.startsWith('/products') ? '/products' : e.url;
      });

    this.subUser = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = user ? true : false
      }
    );
  }

  applyActive(item: string) {
    return this.selectedUrl === item;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.subRouteEvents) {
      this.subRouteEvents.unsubscribe();
    }

    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }

}
