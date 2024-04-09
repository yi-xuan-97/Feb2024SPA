import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/Models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  private getToken(): string {
    // Your token retrieval logic here
    return localStorage.getItem('token')??"";
  }

  getAllCustomer(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    // Adding the Ocp-Apim-Subscription-Key header
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);

    return this.http.get("https://customercontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Customer", { headers });
  }
}
