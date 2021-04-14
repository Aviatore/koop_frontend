import {Component, Injectable, OnInit} from '@angular/core';
import {CountDownTokenService} from '../services/count-down-token.service';
import {Input} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input()
  timer: CountDownTokenService;

  @Input()
  name: string;

  constructor() { }

  ngOnInit(): void {
    this.timer.GetTimer(0).subscribe();
  }
}
