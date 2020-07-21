import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NotificationComponent } from './notification/notification.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

import { ProductFormCreateComponent } from './products/product-form-create/product-form-create.component';
import { ProductFormUpdateComponent } from './products/product-form-update/product-form-update.component';

// http://localhost:4200/  - Home
// http://localhost:4200/products  - Products
// http://localhost:4200/products/new  - ProductForm
// http://localhost:4200/products/2/edit  - ProductForm
// http://localhost:4200/products/2  - ProductDetail
// http://localhost:4200/signup  - Sign up
// http://localhost:4200/login  - Login

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products', component: ProductsComponent, children: [
      {
        path: '', component: NotificationComponent, data: {
          header: 'Note!',
          message: 'Use \'Add New Product\' button to create a product. Select a product to view its details.',
          type: 'info'
        }
      },
      { path: 'new', component: ProductFormCreateComponent },
      { path: ':id/edit', component: ProductFormUpdateComponent },
      { path: ':id', component: ProductDetailComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: '**', component: NotificationComponent, data: {
      header: 'Sorry!',
      message: '404 - Page not found.',
      type: 'danger'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)  // router-outlet, routerLink directives, services
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }