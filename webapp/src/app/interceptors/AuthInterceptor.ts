import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AppUserAuth } from '../model/model';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Injectable()
/* tslint:disable */
export class AuthInterceptor implements HttpInterceptor {
  
  user:  AppUserAuth = null;
   constructor(private authService: AuthenticationService,private router: Router) {
    }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*if(req.url === "http://localhost:8080/auth/token"){
       console.log("yes it is true");
       return next.handle(req);
    }
    */
   if(this.router.url == "/login"){
     return next.handle(req);
   }
    this.user = this.authService.currentUserValue;    
    if (localStorage.getItem('currentUser')) {
      const authorizationData = 'Basic ' +  this.user.basicToken;
      console.log(authorizationData);
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          "Authorization": authorizationData
        }
      });      
	  }	
   return next.handle(req);
  }
}
