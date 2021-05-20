import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OrderGrande} from '../order-grande';
import {OrderGrandeService} from '../order-grande.service';
import Util from '../../../../util';
import {Observable} from 'rxjs';
import {Guid} from 'guid-typescript';
import {MatSnackBar} from '@angular/material/snack-bar';
/*import {CoopLastOrderEditDialogComponent} from '../../coop-order/coop-last-order-edit-dialog/coop-last-order-edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';*/

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'orderId',
    'orderStartDate',
    'orderStopDate',
    'orderStatusName',
    'action'
  ];


  dataSource: MatTableDataSource<OrderGrande>;
  itemsPerPage = [10, 25, 50, 100];

  orderId;
  statuses: Observable<string[]>;

  statusVisibility = false;
  activeOrderId: Guid;
  activeOrderStartDate: string;
  currentStatus: string;
  authorized = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private orderGrandeService: OrderGrandeService,
              private snackBarInfo: MatSnackBar) {
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
    this.orderGrandeService.changeStatus(orderId, statusName)
      .subscribe(
        (response) => {
          console.log(response);
          const index = this.dataSource.data.findIndex(p => p.orderId === orderId);
          this.dataSource.data[index].orderStatusName = statusName;
          this.dataSource._updateChangeSubscription();
          this.openSnackBarInfo('Good');
        },
        (error) => {
          console.log(error);
          this.openSnackBarInfo('Bad');
        }
      );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openSnackBarInfo(message: string, action?: string): void {
    let snackBarCss = 'snack-bar-red';
    if (message !== undefined && message.includes('Good')) {
      message = 'Status zamówienia został zmieniony.';
      snackBarCss = 'snack-bar-green';
    }
    this.snackBarInfo.open(message, action, {
      duration: 3000,
      panelClass: snackBarCss
    });
  }


  openStatusBar(orderId: Guid, activeOrderStartDate: string): void {
    if (this.activeOrderId === orderId)
    {
      this.statusVisibility = !this.statusVisibility;
    }
    else
    {
      this.statusVisibility = true;
      this.activeOrderId = orderId;
      this.activeOrderStartDate = activeOrderStartDate;
    }
  }
}
