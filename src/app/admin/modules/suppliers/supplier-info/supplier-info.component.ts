import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../supplier.service';
import {Observable} from 'rxjs';
import {Supplier} from '../supplier';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent implements OnInit {

  ss: SupplierService;
  supplier: Observable<Supplier>;
  id: string;


  constructor(private supplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ss = this.supplierService;
    this.id = this.route.snapshot.params.id;

    this.supplier = this.supplierService.getSupplier(this.id);
  }

}
