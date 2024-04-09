import { Component } from '@angular/core';
import { AccountService } from './Core/Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eShop';

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.validateJWT();
  }
}
