import { Component } from '@angular/core';
import { AccountService } from '../Core/Services/account.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {
  isLoggedIn: boolean = false;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.isLoggedIn.subscribe((p) => {
      this.isLoggedIn = p;
    });
  }

  Logout() {
    this.accountService.Logout();
  }
}
