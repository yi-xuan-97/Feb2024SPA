import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/Shared/Models/Account';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})


export class LoginService {

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<Token> {
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);  
    return this.http.post<Token>('https://authcontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Account', 
    credentials, {
      headers: headers
    });
  }
}
