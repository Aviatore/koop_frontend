import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-created',
  templateUrl: './user-created.component.html',
  styleUrls: ['./user-created.component.css']
})
export class UserCreatedComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) { }

  ngOnInit(): void {
  }

}
