import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

import { LoggerService } from './common/logger.service';
import { ProductsService } from './products/products.service';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';

import { ProductFormCreateComponent } from './products/product-form-create/product-form-create.component';

import { AppRoutingModule } from './app-routing.module';
import { ProductFormUpdateComponent } from './products/product-form-update/product-form-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductFormComponent,
    HomeComponent,
    NotificationComponent,
    ProductListComponent,
    SignUpComponent,
    LoginComponent,
    ProductFormCreateComponent,
    ProductFormUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // ngModel
    AppRoutingModule
  ],
  providers: [LoggerService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
