import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  onSubmit(): void {
    if (this.loginForm.email !== '' && this.loginForm.password !== '') {
      this.loginService.LogIn(this.loginForm.value.email, this.loginForm.value.password);
    }
  }
}
