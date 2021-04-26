import {Supplier} from '../supplier';
import {Guid} from 'guid-typescript';
import {SupplierService} from '../supplier.service';
import {Observable} from 'rxjs';
import {Unit} from '../../services/units.service';
import {MatTableDataSource} from '@angular/material/table';
import {CoopDept} from '../../reports/models/coop-dept';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit, AfterViewInit {

  // suppliers: Observable<Supplier[]>;
  // selectedSupplier?: Supplier;

  displayedColumns: string[] = [
    // 'id',
    'abbr',
    'name',
    'email',
    'phone',
    'oproFullName',
    'available',
    'blocked'
  ];

  dataSource: MatTableDataSource<Supplier>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private supplierService: SupplierService, private route: ActivatedRoute
  ) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
    // this.suppliers = this.supplierService.getSuppliers();

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

  toggleAvailability(supplier: Supplier): void
  {
    // TODO
  }

  toggleBlocked(supplier: Supplier): void
  {
    // TODO
  }
}
