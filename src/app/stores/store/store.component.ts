import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../service/store.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsStore} from '../models/products-store';
import {Info} from '../models/info';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {StoreEditDialogComponent} from '../store-edit-dialog/store-edit-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'stockSupplierId',
    'supplierName',
    'supplierAbbr',
    // 'productId',
    'productName',
    // 'categoryName',
    'price',
    // 'description',
    'amountInMagazine',
    // 'amountMax',
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
  info: Info;
  problem: string;
  storedProducts: ProductsStore[];
  dataSource: MatTableDataSource<ProductsStore>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StoreService,
              public editDialog: MatDialog,
              private snackBarEdit: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.service.getProductsInStore()
      .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
            this.storedProducts = undefined;
            this.problem = undefined;
          } else {
            this.info = undefined;
            this.storedProducts = data;
            this.problem = undefined;

            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            return this.storedProducts;
          }
        },
        err => {
          this.info = undefined;
          this.storedProducts = undefined;
          this.problem = err.error.detail;
        });
  }

  openEditDialog(productId: string, productName: string, amountInMagazine: number, amountMax: number): void {
    const dialogRef = this.editDialog.open(StoreEditDialogComponent, {
      data: {
        productId,
        productName,
        amountInMagazine,
        amountMax
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
      if (result.msg !== undefined) {
        this.openSnackBarEdit(result.msg);
      }
    });
  }

  openSnackBarEdit(message: string, action?: string): void {
    let snackBarCss = 'snack-bar-red';
    if (message !== undefined && message.includes('The quantity of the product has been changed.')) {
      message = 'Ilości produktu zostały zmienione.';
      snackBarCss = 'snack-bar-green';
    } else if (message !== undefined && message.includes('Selected product does not exist or does not have it in stock.')) {
      message = 'Wybrany produkt nie istnieje lub nie ma go w magazynie.';
    } else if (message !== undefined && message.includes('The entered \'Amount In Magazine\' must be greater or equal than 0.')) {
      message = 'Wprowadzona "Ilość w magazynie" musi być większa lub równa 0.';
    } else if (message !== undefined && message.includes('The entered \'Amount Max\' must be greater or equal than 0.')) {
      message = 'Wprowadzona "Max ilość w magazynie" musi być większa lub równa 0.';
    } else if (message !== undefined && message.includes('The \'Amount In Magazine\' must not be greater than \'Amount Max\'.')) {
      message = '"Ilość w magazynie" nie może być większa niż "Max ilość w magazynie".';
    }
    this.snackBarEdit.open(message, action, {
      duration: 3500,
      panelClass: snackBarCss
    });
  }
}
