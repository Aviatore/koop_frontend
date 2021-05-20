import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../supplier.service';
import {Observable} from 'rxjs';
import {Supplier} from '../supplier';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

  ss: SupplierService;
  supplier: Observable<Supplier>;
  id: string;

  displayedColumns: string[] = [
    // 'id',
    'supplierAbbr',
    'supplierName',
    // 'email',
    // 'phone',
    'description',
    'oproFullName',
    'available',
    'blocked'
  ];

  dataSource: MatTableDataSource<Observable<Supplier>>;

  // sup: Supplier = {
  //   supplierId: null,
  //   picture: null,
  //   receivables: -100,
  //   orderClosingDate: new Date(),
  //   oproId: null,
  //   supplierAbbr: 'TEST',
  //   supplierName: 'TESTowy fgs',
  //   email: 'em@em.pl',
  //   blocked: true,
  //   available: true,
  //   description: 'asfksdhfid shgflish  dfghskdhgls dhglkdsnflkm nsd dskfhldak elhfladflkdsmfkl ',
  //   oproFullName: 'Tomasz Kot',
  //   phone: '12345425'
  // };



  constructor(private supplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ss = this.supplierService;
    this.id = this.route.snapshot.params.id;

    this.supplier = this.supplierService.getSupplier(this.id);
    this.dataSource = new MatTableDataSource([this.supplier]);

  }

}
