import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, mergeMap, of, toArray } from 'rxjs';
import { CartItem } from 'src/app/Shared/Models/CartItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  private data: CartItem = {
    productId: 1,
    productName: 'Smartphone',
    customerName: 'John Doe',
    orderDate: '2023-10-01T00:00:00',
    amount: 2,
    price: 799.99,
    totalPrice: 1599.98,
  };

  constructor(private http: HttpClient) {}

  addToCart(product: CartItem) {
    const existingItem = this.items.find(
      (item) => item.productId === product.productId
    );
    if (existingItem) {
      existingItem.amount += 1;
      existingItem.totalPrice = existingItem.amount * existingItem.price;
    } else {
      product.totalPrice = product.price; // Initial totalPrice is just the price of one item
      this.items.push(product);
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  removeItem(productId: number) {
    this.items = this.items.filter((item) => item.productId !== productId);
  }

  clearCart() {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.totalPrice, 0);
  }

  checkOut(cartitem: CartItem[]): Observable<any> {
    console.log(cartitem);
    console.log(this.data);
    return from(cartitem).pipe(
      mergeMap(cartItem => 
        this.postCartItem(cartItem),
        1  // Ensures sequential processing
      ),
      toArray()  // Combine all responses into a single array
    );
  }



  postCartItem(cartItem: CartItem): Observable<any> {
    return this.http.post<any>(
      'https://ordercontainer.delightfultree-b8fae9a2.westus.azurecontainerapps.io/api/Order',
      cartItem,
      {
        headers: { 'Ocp-Apim-Subscription-Key': environment.subscriptionKey },
      }
    ).pipe(
      catchError(error => {
        console.error('Error posting cart item:', cartItem, error);
        return of(null);  // Continue with other items even if one fails
      })
    );
  }

}
