import { AuthToken } from 'src/app/models/AuthToken';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.authService.user$.pipe(
      //   map((user:AuthToken) => {
      //     if (user) {
      //       return true;
      //     } else {
      //       this.router.navigate(['login'], {
      //         queryParams: { returnUrl: state.url },
      //       });
      //       return false;
      //     }
      //   })
      // );
      return this.authService._loggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }

}
