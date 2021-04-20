import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
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
      firstName: [''],
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

  onSubmit(): void {
    this.usersService.CreateUser(this.userData.getRawValue());
  }
}
