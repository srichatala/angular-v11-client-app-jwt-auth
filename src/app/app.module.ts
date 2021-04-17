import { MaterialModule } from './material/material.module';
import { CustomerComponent } from './components/customer/customer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CoreModule } from './core/core.module';
import { ProductComponent } from './components/products/product/product.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    NavbarComponent,
    UnauthorizedComponent,
    CustomerComponent,
    ProductComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
