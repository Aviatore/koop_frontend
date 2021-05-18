import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PasswordResetService} from '../../password-reset/services/password-reset.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
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
    this.userId = localStorage.getItem('login_userId');
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

      this.passwordResetService.selfResetPassword(this.userId, this.password.nativeElement.value)
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
