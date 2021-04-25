import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {Urls} from '../admin/urls';
import {AppUrl} from '../urls/app-url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  alertVisibilityTimeSec = 2;
  alertVisibility: number;
  loginS: LoginService;
  loginForm;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private route: Router) { }

  ngOnInit(): void {
    this.loginS = this.loginService;

    this.loginForm = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          RxwebValidators.email()
        ]
      }],
      password: ['', {
        validators: [
          Validators.required,
          Validators.minLength(8)
        ]
      }]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.submitted = true;

      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    } else {
      this.submitted = false;

      of(this.loginService.LogIn(this.loginForm.value.email, this.loginForm.value.password)).subscribe(observer => {
        this.showAlert().subscribe();
      });
    }
  }

  get field(): any {
    return this.loginForm.controls;
  }

  showAlert(): Observable<any> {
    return new Observable(observer => {
      this.alertVisibility = this.alertVisibilityTimeSec;

      const handler = setInterval(() => {
        this.alertVisibility--;

        if (this.alertVisibility === 0) {
          clearInterval(handler);
          if (this.loginS.loginResult) {
            this.route.navigate([AppUrl.HOME_PAGE_URL]);
          }
        }
      }, 1000);
    });
  }
}
