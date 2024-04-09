import { Component, OnInit } from '@angular/core';
import { Register } from '../Shared/Models/Register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../Core/Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData:Register = {
    name:        "",
    email:       "",
    address:     "",
    phoneNumber: "",
    password:    "",
    role:        "User"
  };
  registerForm!:FormGroup;
  submitted:boolean = false;
  flag:boolean = false;
  constructor(private fb:FormBuilder, private accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:['', Validators.required]
    });
  }

  get RegisterFormControl(){
    return this.registerForm.controls;
  }

  Register(){
    if (this.registerForm.valid){
      this.registerData.name = this.registerForm.controls['Name'].value;
      this.registerData.email = this.registerForm.controls['email'].value;
      this.registerData.password = this.registerForm.controls['password'].value;
      this.accountService.Register(this.registerData).subscribe(data => {
        if (data){
          this.submitted = true;
          setTimeout(() => {
            this.router.navigateByUrl('/Account/Login');
          }, 3000);
        }
        else {
          this.flag = true;
        }
      });
    };
  }
}