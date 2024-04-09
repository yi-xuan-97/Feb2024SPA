import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomerService } from '../Core/Services/customer.service';
import { Router } from '@angular/router';
import { User } from '../Shared/Models/User';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  
  constructor(private customerService: CustomerService, private router: Router) {}

  usersList: User[] = [];

  ngOnInit(): void {
    this.customerService
      .getAllCustomer()
      .subscribe((data) => (this.usersList = data));
  } 

}
