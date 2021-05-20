import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {PasswordResetService} from '../services/password-reset.service';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  submitted = false;
  alertVisibilityTimeSec = 2;
  alertVisibility: number;
  passwordResetS: PasswordResetService;
  passResetForm;

  @ViewChild('email') email: ElementRef;

  constructor(private fb: FormBuilder,
              private passwordResetService: PasswordResetService) { }

  ngOnInit(): void {
    this.passwordResetS = this.passwordResetService;
    this.passResetForm = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          RxwebValidators.email()
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

      console.log(`Email: ${this.email.nativeElement.value}`);
      this.passwordResetService.sendPasswordResetLink(this.email.nativeElement.value)
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

      /*const handler = setInterval(() => {
        this.alertVisibility--;

        if (this.alertVisibility === 0) {
          clearInterval(handler);
        }
      }, 1000);*/
    });
  }
}
