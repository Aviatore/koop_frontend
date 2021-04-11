import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UnitsService} from "./units.service";
import { UnitComponent } from './unit/unit.component';


@NgModule({
  declarations: [
    AppComponent,
    UnitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UnitsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
