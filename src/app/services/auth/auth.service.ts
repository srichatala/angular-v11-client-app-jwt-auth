import { Login } from './../../models/Login';
import { Observable, throwError } from 'rxjs';
import { LoggerService } from './../logger/logger.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthToken } from 'src/app/models/AuthToken';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url :string = environment.apiUrl+"customer/login";
  constructor(private http:HttpClient, private logger:LoggerService) { }

  login(data:Login):Observable<AuthToken>{
    return this.http.post<AuthToken>(this.url, data, httpOptions)
      .pipe(
        map((res:AuthToken)=>res),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.logger.log(`'An error occurred:', error.error.message`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.logger.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
