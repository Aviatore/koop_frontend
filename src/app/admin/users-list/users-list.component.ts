import { Component, OnInit } from '@angular/core';
import {UsersService} from '../admin-services/users.service';
import {User} from '../admin-interfaces/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  users: User[];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.usersService.GetAllUsers();
    /*this.usersService.GetAllUsers().subscribe(
      p => {
        console.log(p);
      }
    );
    console.log(this.users);*/
  }
}
