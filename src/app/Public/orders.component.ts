import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/Models/User';
import { AccountService } from '../Core/Services/account.service';
import { OrderService } from '../Core/Services/order.service';
import { Order } from '../Shared/Models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  currentUser:User = {} as User;
  isAdmin: boolean = false;

  orders: Order[] = [];
  customerOrders: Order[] = [];

  csutomerId: number = 0;

  constructor(private accountService: AccountService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(p => {
      this.currentUser = p;
      this.isAdmin= this.currentUser.role==="Admin";
    });

    this.fetchOrders();
  }

  fetchOrders() {
    if (this.isAdmin) {
      // Fetch all orders if the user is an admin
      this.orderService.getAllOrder().subscribe(orders => {
        this.orders = orders;
      });
    } else {
      // Fetch orders by customer ID if not an admin
      this.orderService.getOrderByCustomer(this.currentUser.name).subscribe(orders => {
        this.orders = orders;
      });
    }
  }

}
