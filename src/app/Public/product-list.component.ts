import { Component, OnInit } from '@angular/core';
import { Product } from '../Shared/Models/Product';
import { ProductService } from '../Core/Services/product.service';
import { Router } from '@angular/router';
import { Order } from '../Shared/Models/Order';
import { CartService } from '../Core/Services/cart.service';
import { AccountService } from '../Core/Services/account.service';
import { User } from '../Shared/Models/User';
import { CartItem } from '../Shared/Models/CartItem';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private accountService: AccountService
  ) {}

  productsList: Product[] = [];
  currentUser: User = {} as User;
  addItemMessage: string = '';

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((data) => (this.productsList = data));

    this.accountService.currentUser.subscribe((p) => {
      this.currentUser = p;
    });
  }

  onDetailClick(productId: number): void {
    console.log('Product ID:', productId);
    this.router.navigate(['/Product', productId]);
  }

  isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  getCurrentFormattedDate(): string {
    const now = new Date();
    return now.toISOString().slice(0, 19); // Returns the date in 'YYYY-MM-DDTHH:mm:ss' format
  }

  addToCart(product: any) {
    const formattedDate = this.getCurrentFormattedDate();

    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      customerName: this.currentUser.name,
      orderDate: formattedDate,
      amount: 1,
      price: product.price,
      totalPrice: product.price,
    };
    this.cartService.addToCart(cartItem);
    this.addItemMessage = `${product.name} has been added to your cart!`;
    setTimeout(() => (this.addItemMessage = ''), 3000);
  }
}
