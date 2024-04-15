import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/Shared/Models/Order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getAllOrder():Observable<Order[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);
    return this.http.get<Order[]>('https://ordercontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Order',{
      headers: {'Ocp-Apim-Subscription-Key':environment.subscriptionKey}
    });
  }

  getOrderByCustomer(name: string):Observable<Order[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);
    return this.http.get<Order[]>('https://ordercontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Order/bycustomer/'+`${name}`,{
      headers: {'Ocp-Apim-Subscription-Key':environment.subscriptionKey}
    });
  }
}
