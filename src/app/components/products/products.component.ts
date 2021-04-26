import { Product } from './../../models/Product';
import { ProductService } from './../../services/product/product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './../../services/logger/logger.service';
import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!:Product[];

  constructor(private productService:ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.GetProducts().subscribe(res=>{
      this.products = res;
    },err=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigate(['unauthorized']);
        }
      }
    });
  }

  crossOffItem(id:number):void{
    this.products = this.products.filter(item => item.id !== id);
  }
}
