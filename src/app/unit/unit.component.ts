import { Component, OnInit } from '@angular/core';
import {Unit, UnitsService} from '../services/units.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  units: Observable<Unit[]>;

  constructor(private unitS: UnitsService) { }

  ngOnInit(): void {
    console.log(`Getting units ...`);
    this.units = this.unitS.GetUnits();
  }
}
