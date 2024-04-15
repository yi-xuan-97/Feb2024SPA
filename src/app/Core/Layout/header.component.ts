import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { User } from 'src/app/Shared/Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  currentUser:User = {} as User;
  isAdmin: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.isLoggedIn.subscribe((p) => {
      this.isLoggedIn = p;
    });
    this.accountService.currentUser.subscribe(p => {
      this.currentUser = p;
      this.isAdmin= this.currentUser.role==="Admin";
    });
  }

  Logout() {
    this.accountService.Logout();
  }
}
