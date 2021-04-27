import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../admin-services/users.service';
import {User} from '../admin-interfaces/user';
import {Observable, of} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LoggerService} from '../../services/logger.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  alertVisibility: number;
  alertVisibilityTimeSec = 3;
  us: UsersService
  columnHeaders = ['firstName', 'lastName', 'email', 'action'];
  dataSource: MatTableDataSource<User>;
  users$: Observable<User[]>;
  itemsPerPage = [10, 25, 50, 100];
  users: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.us = this.usersService;
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

  removeUser(user: User): void {
    this.usersService.remUser(user.id).subscribe({
      next: () => {
        console.log(...this.logger.info(`User with Id: ${user.id} was removed.`));
        this.us.errorResponse = {
          detail: `Konto użytkownika zostało usunięte.`,
          status: 200
        };
      },
      error: error => {
        console.log(...this.logger.error(error));
        this.showAlert().subscribe();
      },
      complete: () => {
        this.removeRow(user);
        this.dataSource._updateChangeSubscription();
        this.showAlert().subscribe();
      }
    });
  }

  removeRow(row: User): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
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
