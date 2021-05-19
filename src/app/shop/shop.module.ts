import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import {ProductComponent} from './product/product.component';
import {OrderDialogComponent} from './order-dialog/order-dialog.component';

import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { SingleProductComponent } from './single-product/single-product.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';


@NgModule({
  declarations: [
    ProductComponent,
    OrderDialogComponent,
    ProductDialogComponent,
    SingleProductComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatTooltipModule,
        ShopRoutingModule
    ]
})
export class ShopModule { }
