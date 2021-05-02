import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CoopNames} from '../models/coop-names';
import {filter, map, startWith, switchMap} from 'rxjs/operators';
import {CoopOrderService} from '../service/coop-order.service';
import {CoopOrder} from '../models/coop-order';
import {Info} from '../models/info';
import {Problem} from '../models/problem';
import {MatTableDataSource} from '@angular/material/table';
import {CoopOrderNode} from '../models/coop-order-node';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {CoopLastOrderDelDialogComponent} from '../coop-last-order-del-dialog/coop-last-order-del-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CoopLastOrderEditDialogComponent} from '../coop-last-order-edit-dialog/coop-last-order-edit-dialog.component';

@Component({
  selector: 'app-coop-last-order',
  templateUrl: './coop-last-order.component.html',
  styleUrls: ['./coop-last-order.component.css']
})
export class CoopLastOrderComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'orderId',
    // 'orderedItemId',
    // 'productId',
    'productName',
    'price',
    'fundPrice',
    'quantity',
    'totalPrice',
    'totalFundPrice',
    'orderStatusName',
    'actionButtons'
  ];
  coopId: string;
  control = new FormControl();
  filteredCoopNames: Observable<CoopNames[]>;
  coopLastGrande: CoopOrder[];
  info: Info;
  problem: Problem;
  dataSource: MatTableDataSource<CoopOrderNode>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CoopOrderService,
              public delDialog: MatDialog,
              private snackBarDel: MatSnackBar,
              private editDialog: MatDialog,
              private snackBarEdit: MatSnackBar) {
  }

  ngOnInit(): void {
    this.filteredCoopNames = this.filterCoops();
  }

  ngAfterViewInit(): void {
    this.getCoopLastGrande(this.coopId);
  }

  filterCoops(): Observable<CoopNames[]> {
    return this.control.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
  }

  private _filter(value: string): Observable<CoopNames[]> {
    const enteredValue = value.toLowerCase();
    return this.service.getCooperators().pipe(
      filter(data => !!data),
      map((data) => {
        return data.filter(option => option.fullName.toLowerCase().includes(enteredValue));
      })
    );
  }

  getCoopLastGrande(coopId: string): void {
    this.coopId = coopId;
    if (coopId !== undefined) {
      this.service.getCoopLastOrder(coopId)
        .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
            this.problem = undefined;
            this.coopLastGrande = undefined;
          } else if ('traceId' in data) {
            this.info = undefined;
            this.problem = data;
            this.coopLastGrande = undefined;
          } else {
            this.info = undefined;
            this.problem = undefined;
            this.coopLastGrande = data;

            this.dataSource = new MatTableDataSource(data[0].coopOrderNode);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            return this.coopLastGrande;
          }
        });
    }
  }

  openDelDialog(orderItemId: string, productName: string): void {
    const dialogRef = this.delDialog.open(CoopLastOrderDelDialogComponent, {
      data: {
        orderItemId,
        productName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCoopLastGrande(this.coopId);
      if (result.msg !== undefined) {
        this.openSnackBarDel(result.msg);
      }
    });
  }

  openSnackBarDel(message: string, action?: string): void {
    let snackBarCss = 'snack-bar-red';
    if (message !== undefined && message.includes('The ordered item has been deleted (order ID:')) {
      message = 'Produkt został usuniety z zamówienia.';
      snackBarCss = 'snack-bar-green';
    }
    if (message !== undefined && message.includes('There is no product ordered with the given ID:')) {
      message = 'Nie ma takiego produktu w zamówieniu.';
    }
    this.snackBarDel.open(message, action, {
      duration: 3000,
      panelClass: snackBarCss
    });
  }

  openEditDialog(orderItemId: string, productName: string, quantity: number): void {
    const dialogRef = this.editDialog.open(CoopLastOrderEditDialogComponent, {
      data: {
        orderItemId,
        productName,
        quantity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCoopLastGrande(this.coopId);
      if (result.msg !== undefined) {
        this.openSnackBarEdit(result.msg);
      }
    });
  }

  openSnackBarEdit(message: string, action?: string): void {
    let snackBarCss = 'snack-bar-red';
    if (message !== undefined && message.includes('The quantity of the ordered product has been changed to')) {
      message = 'Ilość produktu w zamówieniu została zmieniona.';
      snackBarCss = 'snack-bar-green';
    }
    if (message !== undefined && message.includes('There is no product ordered with the given ID:')) {
      message = 'Nie ma takiego produktu w zamówieniu.';
    }
    if (message !== undefined && message.includes('The entered quantity must be greater than 0.')) {
      message = 'Wprowadzona ilość musi być większa niż 0.';
    }
    this.snackBarEdit.open(message, action, {
      duration: 3000,
      panelClass: snackBarCss
    });
  }
}
