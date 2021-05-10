import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketViewRoutingModule } from './basket-view-routing.module';
import {BacketViewComponent} from './backet-view/backet-view.component';
import { BasketIconComponent } from './basket-icon/basket-icon.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
  declarations: [
    BacketViewComponent,
    BasketIconComponent,
  ],
  exports: [
    BasketIconComponent
  ],
  imports: [
    CommonModule,
    BasketViewRoutingModule,
    MaterialModule
  ]
})
export class BasketViewModule { }
