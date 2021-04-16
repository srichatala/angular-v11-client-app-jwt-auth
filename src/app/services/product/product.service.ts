import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  loginUrl :string = `${environment.apiUrl}product/products`;

  GetProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.loginUrl)
      .pipe(
        map((res)=>{
          return res
        })
    );
  }
}
