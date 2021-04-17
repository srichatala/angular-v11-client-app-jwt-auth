import { Customer } from './../../models/Customer';
import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer!:Customer
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customerService.GetUser().subscribe(c=>{
      this.customer = c;
    });
  }

}
