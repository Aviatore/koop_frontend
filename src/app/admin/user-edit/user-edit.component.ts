import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../admin-interfaces/user';
import {UsersService} from '../admin-services/users.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  submitted = false;
  userData;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      userName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      phoneNumber: [''],
      email: ['', [
        Validators.required,
        RxwebValidators.email()
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      repeatPassword: ['', [
        Validators.required,
        RxwebValidators.compare({fieldName: 'newPassword'})
      ]],
      debt: [''],
      fundId: ['', Validators.required],
      info: ['']
    });
  }

  get firstName(): any {
    return this.userData.get('firstName');
  }

  get field(): any {
    return this.userData.controls;
  }

  get email(): any {
    return this.userData.get('email');
  }

  get repeatPassword(): any {
    return this.userData.get('repeatPassword');
  }

  onSubmit(): void {
    console.log(this.userData.controls);
    if (this.userData.invalid) {
      this.submitted = true;

      Object.keys(this.userData.controls).forEach(field => {
        const control = this.userData.get(field);
        control.markAsTouched({onlySelf: true});
      });

      if (this.field.fundId.value.startsWith('Choose')) {
        this.field.fundId.setErrors({required: true});
      }

    } else {
      this.submitted = false;

      // console.log(`Raw data: ${JSON.stringify(this.userData.getRawValue())}`);
      this.usersService.CreateUser(this.userData.getRawValue());
    }
  }
}
