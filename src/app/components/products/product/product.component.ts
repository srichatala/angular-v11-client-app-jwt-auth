import { Product } from './../../../models/Product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product

  @Output() deleteRequest = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  deleteProd(id:number){
    this.deleteRequest.emit(id);
  }

}
