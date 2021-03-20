import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-succ-user',
  templateUrl: './succ-user.component.html',
  styleUrls: ['./succ-user.component.css']
})
/* tslint:disable */
export class SuccUserComponent implements OnInit {

  toggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clickEvent() {
    this.toggle = !this.toggle;
  }
}
