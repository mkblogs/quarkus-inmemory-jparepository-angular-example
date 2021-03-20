import { Component, OnInit } from '@angular/core';
import { ResponseDTO, ChangePassword, Error } from '../model/model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user/user.service';
import { PasswordMatchValidator } from './PasswordMatchValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
/* tslint:disable */
export class ChangePasswordComponent implements OnInit {

  toggle: boolean = false;
  responseObject : ResponseDTO<ChangePassword,Error> = null;

  //Form Related
  changePasswordForm: FormGroup;
  password: FormControl;
  repeatPassword: FormControl;
  encrypted: FormControl;

  submitted = false;

  //spinner
  spinnerConfig = {  
     type: 'timer',        
     bdColor: "rgba(0, 0, 0, 0.8)",
     color: "white",
     fullScreen: true,        
   }

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              ) { }


  ngOnInit() {
    this.ngOnInitFormBuilder();
  }

  ngOnInitFormBuilder(): void {
    this.password = new FormControl('',[Validators.required]);
    this.repeatPassword = new FormControl('',[Validators.required]);
    this.encrypted = new FormControl('');
    
    this.changePasswordForm = this.formBuilder.group({
          password: this.password,
          repeatPassword: this.repeatPassword,
          encrypted: this.encrypted,
      },
       {validators : PasswordMatchValidator},
      );
      this.repeatPassword.setErrors({});
  }
  clickEvent() {
    this.toggle = !this.toggle;
  }
  gotoWelcome(): void {
     this.router.navigate(['/welcome']);
  }

  get f() { return this.changePasswordForm.controls; }

  changePassword(): void {
    this.submitted = true;    
    if(!this.changePasswordForm.errors){
      this.spinner.show("spinner",this.spinnerConfig);
      let changePassword: ChangePassword = {
        userId   : 5,
        password       : this.password.value ? this.password.value : '',
        repeatPassword : this.repeatPassword.value ? this.repeatPassword.value : '',
        encrypted      : this.encrypted.value ? this.encrypted.value : '',     
      };
      
      this.userService.changePassword(changePassword).subscribe(         
        data => {
          this.responseObject = JSON.parse(JSON.stringify(data));
          this.spinner.hide("spinner");
          if(this.responseObject.isError){
              //let errorObject = this.responseObject.errorObject;
              //alert(errorObject.errorMsg);  
          }else{
            this.router.navigate(['/welcome']);
          }          
        },
        error => {
            this.spinner.hide("spinner");
            alert(error);
        }
     );  

    }
    //console.log(this.changePasswordForm.errors);
  }
  
}
