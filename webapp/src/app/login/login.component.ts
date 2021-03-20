import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/* tslint:disable */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
             private authService: AuthenticationService) { }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() {   
    this.loginForm = this.formBuilder.group({
            username: this.username,
            password: this.password
        });
  }

   get f() { return this.loginForm.controls; }

   onSubmit() {
     this.submitted = true;     
     if (!this.loginForm.valid) {
        return;
     }
     this.authService.login(this.username.value,this.password.value);     
   }

}
