import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../admin-interfaces/user';
import {UsersService} from '../admin-services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userData;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      firstName: ['', Validators.minLength(5)],
      lastName: [''],
      userName: [''],
      phoneNumber: [''],
      email: [''],
      newPassword: [''],
      repeatPassword: [''],
      debt: [''],
      fundId: [''],
      info: ['']
    });
  }

  get firstName(): any {
    return this.userData.get('firstName');
  }

  onSubmit(): void {
    this.usersService.CreateUser(this.userData.getRawValue());
  }
}
