import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from '../services/auth/auth.service';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { appInitializer } from '../services/app-initializer';



@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   multi: true,
    //   deps: [AuthService],
    // },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
