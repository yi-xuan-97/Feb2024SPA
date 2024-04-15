import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/app/Shared/Models/Account';
import { Register } from 'src/app/Shared/Models/Register';
import { User } from 'src/app/Shared/Models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable();

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}


  Register(registerData: Register): Observable<boolean> {
    return this.http.post<boolean>(
      'https://customercontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Customer',
      registerData,
      {
        headers: { 'Ocp-Apim-Subscription-Key': environment.subscriptionKey },
      }
    );
  }

  login(credentials: Login): Observable<Token> {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Ocp-Apim-Subscription-Key',
      environment.subscriptionKey
    );
    return this.http.post<Token>(
      'https://authcontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Account',
      credentials,
      {
        headers: headers,
      }
    );
  }

  Logout() {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next({} as User);
  }

  populateUserInfoFromToken(){
    var tokenValue = localStorage.getItem("token");

    if (tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.currentUserSubject.next(decodedToken);
      this.isLoggedInSubject.next(true);
    }
  }

  validateJWT() {
    //Code to validate token goes here
    var tokenValue = localStorage.getItem('token');
    if (tokenValue != null) {
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(decodedToken);
    }
  }

}
