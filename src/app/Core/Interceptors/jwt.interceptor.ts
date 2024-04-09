import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { User } from 'src/app/Shared/Models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  isLoggedIn:boolean = false;
  currentUser:User = {} as User;
  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const loginTime = localStorage.getItem("LoginTime");

    this.accountService.isLoggedIn.subscribe(p => {
      this.isLoggedIn = p;
    });
    this.accountService.currentUser.subscribe(p => {
      this.currentUser = p;
    });

    var token = localStorage.getItem("token");

    if (this.isLoggedIn){
      // var timeSinceLogin = Date.now() - Number(loginTime);
      if (!this.accountService.jwtHelper.isTokenExpired(token)){
        request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
                });
      }
      else if (this.accountService.jwtHelper.isTokenExpired(token)){
        localStorage.clear();
      }
    }

    return next.handle(request);
  }
}
