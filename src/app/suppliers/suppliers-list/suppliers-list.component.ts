import {Supplier} from '../supplier';
import {Guid} from 'guid-typescript';
import {SupplierService} from '../supplier.service';
import {MatTableDataSource} from '@angular/material/table';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';


import Util from '../../util';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit, AfterViewInit {

  // suppliers: Observable<Supplier[]>;
  // selectedSupplier?: Supplier;

  authorized = false;

  searchText = '';

  displayedColumns: string[] = [
    // 'id',
    'supplierAbbr',
    'supplierName',
    'email',
    'phone',
    'oproFullName',
    'available',
    'blocked'
  ];

  dataSource: MatTableDataSource<Supplier>;
  itemsPerPage = [10, 25, 50, 100];

  supplierId;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private supplierService: SupplierService) {
    this.getDataFromObservable();
    this.checkAuthorization();
  }


  ngOnInit(): void {
    // this.checkAuthorization();
    // this.suppliers = this.supplierService.getSuppliers();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  checkAuthorization(): void {
    const token = localStorage.getItem('token');
    const tokenDecoded = Util.parseJwt(token);
    if (tokenDecoded) {
      const roleKey = Object.keys(tokenDecoded).find(p => p.endsWith('role'));
      console.log(`role: ${tokenDecoded[roleKey]}`);
      const role = tokenDecoded[roleKey];
      this.authorized = (role.includes('Admin') || role.includes('Koty') || role.includes('Opro'));
      console.log('authorized: ' + this.authorized);
    }
    else{
      console.log('null token');
      this.authorized = false;
      console.log('authorized: ' + this.authorized);
    }
  }

  getDataFromObservable(): void {
    this.supplierService.getSuppliers()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngAfterViewInit(): void {
    this.supplierService.getSuppliers()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  // onSelect(supplier: Supplier): void {
  //   this.selectedSupplier = supplier;
  // }



  toggleAvailability(Id: Guid): void
  {
    this.supplierId = Id;
    console.log(`${this.supplierId}`);
    this.supplierService.toggleAvail(this.supplierId);
  }

  toggleBlocked(Id: Guid): void
  {
    this.supplierId = Id;
    this.supplierService.toggleBlocked(this.supplierId);
  }

}
