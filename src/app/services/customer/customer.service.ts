import { Customer } from './../../models/Customer';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  loginUrl :string = `${environment.apiUrl}customer/customer`;
  constructor(private http: HttpClient) { }

  GetUser():Observable<Customer>{
    return this.http.get<Customer>(this.loginUrl)
      .pipe(
        map((res)=>{
          return res
        })
    );
  }

}

