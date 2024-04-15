import { Component, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../Shared/Models/Account';
import { HttpClient } from '@angular/common/http';
import { Token } from '../Shared/Models/Token';
import { LoginService } from '../Core/Services/login.service';
import { AccountService } from '../Core/Services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: Login = { username: "", password: "" };
  invalidLogin: boolean = false;
  flag: boolean = false;
  token: any = { username: "", jwtToken: "", expiresIn: 0 };

  constructor(private http: HttpClient, private loginservice: LoginService, private accountservice: AccountService, private router:Router) {}

  Login(form: NgForm) {
    const credentials: Login = {
      username: form.value.userName,
      password: form.value.password,
    };

    this.loginservice.login(credentials).subscribe({
      next: (response) => {
        // Handle success, such as saving the auth token and redirecting.
        this.token = response;
        
        if (this.token.jwtToken != "" && this.token.expiresIn > 0){

          localStorage.setItem("token",this.token?.jwtToken?? '');
          localStorage.setItem("expiration", this.token?.expiresIn?.toString()?? '');
          localStorage.setItem("loginTime", Date.now().toString());
  
          this.accountservice.populateUserInfoFromToken();
        }
        
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        // Handle error, such as showing an error message.
        console.error('Login failed', error);
      },
    });
  }
}
