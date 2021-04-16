import { Router } from '@angular/router';
import { Customer } from './../../models/Customer';
import { Registration } from './../../models/Registration';
import { Login } from './../../models/Login';
import { BehaviorSubject, Observable, of, Subscription, throwError } from 'rxjs';
import { LoggerService } from './../logger/logger.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthToken } from 'src/app/models/AuthToken';
import { catchError, delay, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  timer!: Subscription;

  loginUrl :string = `${environment.apiUrl}customer/login`;
  registerUrl :string = `${environment.apiUrl}customer/registration`;
  userUrl:string = `${environment.apiUrl}customer/user`;
  refreshTokenUrl:string = `${environment.apiUrl}customer/refresh-token`;

  _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //private _user = new BehaviorSubject<AuthToken>({} as any);
//  user$: Observable<AuthToken> = this._user.asObservable();
  //loggedIn$: Observable<boolean> = this._loggedIn.asObservable();

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.stopTokenTimer();
      }
      if (event.key === 'login-event') {
        this.stopTokenTimer();
        this.http.get<Customer>(this.userUrl).subscribe((x) => {
            return x
        });
      }
    }
  }

  constructor(private http:HttpClient, private logger:LoggerService, private router:Router) { }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }


  login(data:Login):Observable<AuthToken>{
    return this.http.post<AuthToken>(this.loginUrl, data, httpOptions)
      .pipe(
        map((res)=>{
          this._loggedIn.next(true);
          this.setLocalStorage(res);
          return res
        }),
        catchError(this.handleError)
    );
  }

  registration(data:Registration):Observable<AuthToken>{
    return this.http.post<AuthToken>(this.registerUrl, data, httpOptions)
    .pipe(
        map((res)=>{
          this._loggedIn.next(true);
          this.setLocalStorage(res);
          return res
        }),
        catchError(this.handleError)
    );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    }

    return this.http
      .post<AuthToken>(this.refreshTokenUrl, { refreshToken })
      .pipe(
        map((res) => {
          this._loggedIn.next(true);
          this.setLocalStorage(res);
          this.startTokenTimer();
          return res;
        })
      );
  }
  logout() {
    this._loggedIn.next(false);
    this.clearLocalStorage()
    this.router.navigate(['login']);
  }

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }

  setLocalStorage(x: AuthToken) {
    localStorage.setItem('access_token', x.accessToken);
    localStorage.setItem('refresh_token', x.refreshToken);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap(() => this.refreshToken())
      )
      .subscribe();
  }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
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
