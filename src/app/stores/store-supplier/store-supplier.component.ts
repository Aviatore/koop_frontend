import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../service/store.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {SupplierList} from '../models/supplier-list';
import {filter, map, startWith, switchMap} from 'rxjs/operators';
import {Info} from '../models/info';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SupplierProductsList} from '../models/supplier-products-list';
import {SupplierStore} from '../models/supplier-store';
import {MatDialog} from '@angular/material/dialog';
import {StoreSupplierEditDialogComponent} from '../store-supplier-edit-dialog/store-supplier-edit-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {errorObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-store-supplier',
  templateUrl: './store-supplier.component.html',
  styleUrls: ['./store-supplier.component.css']
})
export class StoreSupplierComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'productId',
    'productName',
    // 'categoryName',
    'price',
    // 'description',
    // 'amountInMagazine',
    'amountMax',
    // 'magazine',
    // 'deposit',
    // 'picture',
    // 'unitId',
    // 'supplierId',
    'unitName',
    'available',
    'blocked',
    'actionButtons'
  ];

  suppId: string;

  control = new FormControl();
  filteredSuppliers: Observable<SupplierList[]>;

  info: Info;
  problem: string;
  supplierStore: SupplierStore;
  productsList: SupplierProductsList[];
  dataSource: MatTableDataSource<SupplierProductsList>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StoreService,
              public editDialog: MatDialog,
              private snackBarEdit: MatSnackBar) {
  }

  ngOnInit(): void {
    this.filteredSuppliers = this.filterSuppliers();
  }

  ngAfterViewInit(): void {
    this.getSupplierProducts(this.suppId);
  }

  filterSuppliers(): Observable<SupplierList[]> {
    return this.control.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
  }

  private _filter(value: string): Observable<SupplierList[]> {
    const enteredValue = value.toLowerCase();
    return this.service.getSuppliers().pipe(
      filter(data => !!data),
      map((data) => {
        return data.filter(option => option.supplierName.toLowerCase().includes(enteredValue));
      })
    );
  }

  getSupplierProducts(supplierId: string): void {
    this.suppId = supplierId;
    if (supplierId !== undefined) {
      this.service.getSupplierStore(supplierId)
        .subscribe((data) => {
            if ('info' in data) {
              this.info = data;
              this.supplierStore = undefined;
              this.problem = undefined;
              this.dataSource = undefined;
            } else {
              this.info = undefined;
              this.supplierStore = data;
              this.problem = undefined;

              this.dataSource = new MatTableDataSource(data.supplierProductsList);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

              return this.supplierStore;
            }
          },
          err => {
            this.info = undefined;
            this.supplierStore = undefined;
            this.dataSource = undefined;
            if (err.message !== undefined) {
              this.problem = err.message;
            } else {
              this.problem = 'Unknown Error';
            }
          });
    }
  }

  openEditDialog(productId: string, productName: string, amountMax: number, available: boolean, blocked: boolean): void {
    const dialogRef = this.editDialog.open(StoreSupplierEditDialogComponent, {
      data: {
        productId,
        productName,
        amountMax,
        available,
        blocked
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.suppId !== undefined) {
        this.getSupplierProducts(this.suppId);
      }

      if (result.msg !== undefined) {
        this.openSnackBarEdit(result.msg);
      }
    });
  }

  openSnackBarEdit(message: string, action?: string): void {
    let snackBarCss = 'snack-bar-red';
    if (message !== undefined && message.includes('Selected product does not exist.')) {
      message = 'Wybrany produkt nie istnieje.';
    } else if (message !== undefined && message.includes('The entered \'Amount Max\' must be greater or equal than 0.')) {
      message = 'Wprowadzona ilość musi być większa lub równa 0.';
    } else if (message !== undefined && message.includes('The product has been updated.')) {
      message = 'Produkt został zaktualizowany.';
      snackBarCss = 'snack-bar-green';
    }

    this.snackBarEdit.open(message, action, {
      duration: 3500,
      panelClass: snackBarCss
    });
  }
}
