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

  GetProductList(){
    // this.httpClient.get("https://productcontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Product");

    return this.http.get<Product[]>('https://productcontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Product').pipe(
    catchError(error => {
      console.error('Error fetching products:', error);
      return throwError(error); // Re-throw the error
    })
  );
  }

  getAllProducts():Observable<Product[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.subscriptionKey);
    return this.http.get<Product[]>('https://eshopgateway.azure-api.net/api/Product',{
      headers: {'Ocp-Apim-Subscription-Key':'eb38248b6f214429ab523a00acb0b749'}
    });
  }
}