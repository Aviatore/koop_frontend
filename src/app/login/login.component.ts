import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {Urls} from '../admin/urls';
import {AppUrl} from '../urls/app-url';
import {tap} from 'rxjs/operators';
import {ErrorResponse} from '../admin/admin-interfaces/errorResponse';
import {LoggerService} from '../services/logger.service';
import {OrderMakerService} from '../shop/services/order-maker.service';

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
              private route: Router,
              private logger: LoggerService,
              private orderMakerService: OrderMakerService) { }

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
          Validators.minLength(6)
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

      this.loginService.LogIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        {
          next: result => {
            console.log(...this.logger.info(`Logged in by email: ${this.loginForm.value.email}`));

            const loginResponse = result.body;
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('refresh_token', loginResponse.refreshT);
            localStorage.setItem('login_userId', loginResponse.userId);

            this.loginS.loginResult = true;

            this.orderMakerService.setBadge();
          },
          error: error => {
            console.log(...this.logger.error(error));
            this.loginS.loginResult = false;
            this.showAlert().subscribe();
          },
          complete: () => this.showAlert().subscribe()
        });
      /*of(this.loginService.LogIn(this.loginForm.value.email, this.loginForm.value.password)).subscribe(er => {
        this.showAlert().subscribe();
      });*/
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
