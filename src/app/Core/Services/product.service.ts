import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Shared/Models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);
    return this.http.get<Product[]>('https://eshopgateway.azure-api.net/product/api/Product',{
      headers: {'Ocp-Apim-Subscription-Key':environment.subscriptionKey}
    });
  }


  getProductById(id: number):Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);
    return this.http.get<Product>('https://eshopgateway.azure-api.net/product/api/Product/byid/'+`${id}`,{
      headers: {'Ocp-Apim-Subscription-Key':environment.subscriptionKey}
    });
  }


}