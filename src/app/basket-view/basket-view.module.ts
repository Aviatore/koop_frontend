import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketViewRoutingModule } from './basket-view-routing.module';
import {BasketViewComponent} from './basket-view/basket-view.component';
import { BasketIconComponent } from './basket-icon/basket-icon.component';
import {MaterialModule} from '../material/material.module';
import { SubmitOrderDialogComponent } from './submit-order-dialog/submit-order-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    BasketViewComponent,
    BasketIconComponent,
    SubmitOrderDialogComponent,
  ],
  exports: [
    BasketIconComponent
  ],
    imports: [
        CommonModule,
        BasketViewRoutingModule,
        MaterialModule,
        MatDialogModule
    ]
})
export class BasketViewModule { }
