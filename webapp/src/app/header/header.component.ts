import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { AppUserAuth } from '../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/* tslint:disable */
export class HeaderComponent implements OnInit {

  @Input()
  activeURL: string;

  loggedUser: AppUserAuth = null;

  constructor(private authService: AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.loggedUser = this.authService.currentUserValue;

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
