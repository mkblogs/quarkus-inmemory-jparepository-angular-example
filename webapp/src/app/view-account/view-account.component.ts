import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../model/model';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
/* tslint:disable */
export class ViewAccountComponent implements OnInit {

  toggle: boolean = false;
  viewAccount: Account = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.viewAccount = history.state.accountObject;
  }

  clickEvent() {
    this.toggle = !this.toggle;
  }

  back() {
     this.router.navigate(['/welcome']);
  }
}
