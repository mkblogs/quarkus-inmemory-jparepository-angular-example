import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-succ-account',
  templateUrl: './succ-account.component.html',
  styleUrls: ['./succ-account.component.css']
})
/* tslint:disable */
export class SuccAccountComponent implements OnInit {

  toggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clickEvent() {
    this.toggle = !this.toggle;
  }

}
