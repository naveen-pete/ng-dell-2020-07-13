import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

import { LoggerService } from './common/logger.service';
import { ProductsService } from './products/products.service';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';

// http://localhost:4200/  - Home
// http://localhost:4200/products  - Products
// http://localhost:4200/products/new  - ProductForm
// http://localhost:4200/products/2  - ProductDetail
// http://localhost:4200/signup  - Sign up
// http://localhost:4200/login  - Login

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products', component: ProductsComponent, children: [
      { path: 'new', component: ProductFormComponent },
      { path: ':id/:name', component: ProductDetailComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductFormComponent,
    HomeComponent,
    NotFoundComponent,
    ProductListComponent,
    SignUpComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // ngModel
    RouterModule.forRoot(appRoutes)  // router-outlet, routerLink directives, services
  ],
  providers: [LoggerService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
