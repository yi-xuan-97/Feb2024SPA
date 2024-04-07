import { Component, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../Shared/Models/Account';
import { HttpClient } from '@angular/common/http';
import { Token } from '../Shared/Models/Token';
import { LoginService } from '../Core/Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: Login = { username: '', password: '' };
  invalidLogin: boolean = false;
  flag: boolean = false;
  token: any = { username: '', jwtToken: '', expiresIn: 0 };

  constructor(private http: HttpClient, private loginservice: LoginService) {}

  Login(form: NgForm) {
    const credentials: Login = {
      username: form.value.userName,
      password: form.value.password,
    };

    this.loginservice.login(credentials).subscribe({
      next: (response) => {
        // Handle success, such as saving the auth token and redirecting.
        console.log('Login successful', response);
        this.token = response;
        
        console.log(typeof response);
        console.log(typeof this.token);
        console.log(this.token.jwtToken);
      },
      error: (error) => {
        // Handle error, such as showing an error message.
        console.error('Login failed', error);
      },
    });
  }
}
