import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
/* tslint:disable */
export class ViewUserComponent implements OnInit {

  toggle: boolean = false;
  viewUser: User = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.viewUser = history.state.userObject;
  }

  clickEvent() {
    this.toggle = !this.toggle;
  }

  back() {
     this.router.navigate(['/welcome']);
  }
}
