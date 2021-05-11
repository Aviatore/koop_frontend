import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OrderGrande} from '../order-grande';
import {OrderGrandeService} from '../order-grande.service';
import Util from '../../util';
import {Observable} from 'rxjs';
import {Guid} from 'guid-typescript';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  displayedColumns: string[] = [
    'orderId',
    'orderStartDate',
    'orderStopDate',
    'orderStatusName'
  ];


  dataSource: MatTableDataSource<OrderGrande>;
  itemsPerPage = [10, 25, 50, 100];

  orderId;
  statuses: Observable<string[]>;

  statusVisibility = false;
  activeOrderId: Guid;
  currentStatus: string;
  authorized = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private orderGrandeService: OrderGrandeService) {
    this.getDataFromObservable();
    this.checkAuthorization();
  }

  ngOnInit(): void {
    this.statuses = this.orderGrandeService.getStatuses();
  }

  ngAfterViewInit(): void {
    this.orderGrandeService.getOrders()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  checkAuthorization(): void {
    const token = localStorage.getItem('token');
    const tokenDecoded = Util.parseJwt(token);
    if (tokenDecoded) {
      const roleKey = Object.keys(tokenDecoded).find(p => p.endsWith('role'));
      console.log(`role: ${tokenDecoded[roleKey]}`);
      const role = tokenDecoded[roleKey];
      this.authorized = (role.includes('Admin') || role.includes('Koty'));
      console.log('authorized: ' + this.authorized);
    }
    else{
      console.log('null token');
      this.authorized = false;
      console.log('authorized: ' + this.authorized);
    }
  }

  getDataFromObservable(): void {

    this.orderGrandeService.getOrders()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  changeStatus(orderId: Guid, statusName: string): void {
    this.orderId = orderId;
    // console.log('status: ' + statusName);
    this.orderGrandeService.changeStatus(orderId, statusName);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
