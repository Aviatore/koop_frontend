import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoopOrderRoutingModule } from './coop-order-routing.module';
import { CoopOrdersComponent } from './coop-orders/coop-orders.component';
import {MaterialModule} from '../material/material.module';
import {NgReplacePipeModule} from 'angular-pipes';


@NgModule({
  declarations: [
    CoopOrdersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgReplacePipeModule,
    CoopOrderRoutingModule
  ]
})
export class CoopOrderModule { }
