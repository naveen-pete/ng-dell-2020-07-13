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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [LoggerService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
