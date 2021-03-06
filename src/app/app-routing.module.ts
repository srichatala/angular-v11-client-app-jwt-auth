import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'products', component: ProductsComponent, canActivate:[AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate:[AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
