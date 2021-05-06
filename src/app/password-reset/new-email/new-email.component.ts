import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {Observable} from 'rxjs';
import {PasswordResetService} from '../services/password-reset.service';
import {ActivatedRoute} from "@angular/router";
import {ResponseResult} from "../../admin/admin-interfaces/responseResult";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.css']
})
export class NewEmailComponent implements OnInit {
  submitted = false;
  alertVisibilityTimeSec = 2;
  alertVisibility: number;
  passwordResetToken: string;
  userId: string;
  passwordResetS: PasswordResetService;

  @ViewChild('password') password: ElementRef;
  passResetForm;
  constructor(private fb: FormBuilder,
              private passwordResetService: PasswordResetService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.passwordResetToken = decodeURIComponent(this.router.snapshot.paramMap.get('passwordResetToken'));
    this.userId = this.router.snapshot.paramMap.get('userId');
    console.log(`token: ${this.passwordResetToken}`);
    console.log(`userId: ${this.userId}`);
    this.passwordResetS = this.passwordResetService;
    this.passResetForm = this.fb.group({
      password: ['', {
        validators: [
          Validators.required,
          Validators.minLength(8)
        ]
      }],
      repeatPassword: ['', {
        validators: [
          Validators.required,
          RxwebValidators.compare({fieldName: 'password'})
        ]
      }]
    });
  }

  get field(): any {
    return this.passResetForm.controls;
  }

  onSubmit(): void {
    if (this.passResetForm.invalid) {
      this.submitted = true;

      Object.keys(this.passResetForm.controls).forEach(field => {
        const control = this.passResetForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    } else {
      this.submitted = false;

      this.passwordResetS.errorResponse.detail = 'Przetwarzanie zapytania. Proszę czekać ...';
      this.passwordResetS.errorResponse.status = 300;
      this.alertVisibility = 1;

      this.passwordResetService.resetPassword(this.userId, this.password.nativeElement.value, this.passwordResetToken)
        .pipe(delay(2000))
        .subscribe({
          next: result => {
            this.passwordResetService.errorResponse = result.body;
            console.log(JSON.stringify(result.body));
            this.showAlert().subscribe(this.passResetForm.reset());
          }
        });
    }
  }

  showAlert(): Observable<any> {
    return new Observable(observer => {
      this.alertVisibility = this.alertVisibilityTimeSec;

      const handler = setInterval(() => {
        this.alertVisibility--;

        if (this.alertVisibility === 0) {
          clearInterval(handler);
        }
      }, 1000);
    });
  }
}
