import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Info} from '../models/info';

@Component({
  selector: 'app-submit-order-dialog',
  templateUrl: './submit-order-dialog.component.html',
  styleUrls: ['./submit-order-dialog.component.css']
})
export class SubmitOrderDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Info) { }

  ngOnInit(): void {
  }

}
