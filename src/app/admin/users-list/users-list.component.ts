import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../admin-services/users.service';
import {User} from '../admin-interfaces/user';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  columnHeaders = ['firstName', 'lastName', 'email', 'userName'];
  dataSource: MatTableDataSource<User>;
  users$: Observable<User[]>;
  users: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService,
              private logger: LoggerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.usersService.GetAllUsers().subscribe(users => {
      this.users = users;
      console.log(...this.logger.info(`Number of users: ${this.users.length}`));
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
