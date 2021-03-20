import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user/user.service';
import { User, ResponseDTO, Error } from '../model/model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
/* tslint:disable */
export class UserComponent implements OnInit {

  toggle: boolean = false;
  responseObject : ResponseDTO<User,Error[]> = null;

  editUser: User = null;

  //Form Related
  userForm: FormGroup;
  userName: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;
  repeatPassword: FormControl;
  encrypted: FormControl;
  role: FormControl;
  submitted = false;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              ) { }

  ngOnInit() {
    if(history.state.userObject){
      this.editUser = history.state.userObject;
      console.log(this.editUser);
      this.ngOnInitFormBuilderForUpdate();
    }else{
      this.ngOnInitFormBuilder();
    }    
  }

  ngOnInitFormBuilder() {
    this.userName = new FormControl('',[Validators.required]);
    this.password = new FormControl('',[Validators.required]);
    this.repeatPassword = new FormControl('',[Validators.required]);
    this.firstName = new FormControl('',[Validators.required]);
    this.lastName = new FormControl('',[Validators.required]);
    this.encrypted = new FormControl('');
    this.role      = new FormControl('',[Validators.required]);
    
    this.userForm = this.formBuilder.group({
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          repeatPassword: this.repeatPassword,
          encrypted: this.encrypted,
          role: this.role,
      });
      this.userName.setErrors({});
      this.repeatPassword.setErrors({});
  }

  ngOnInitFormBuilderForUpdate() {
     this.userName = new FormControl(this.editUser.loginName,[Validators.required]);
     this.firstName = new FormControl(this.editUser.firstName,[Validators.required]);
     this.lastName = new FormControl(this.editUser.lastName,[Validators.required]);
     if(this.editUser.role == 'null')
         this.editUser.role = "";
     this.role      = new FormControl(this.editUser.role,[Validators.required]); 

     this.userForm = this.formBuilder.group({
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
          role: this.role,
      });
      this.userName.setErrors({});      
  }

  get f() { return this.userForm.controls; }

  clickEvent() {
    this.toggle = !this.toggle;
  }
 
  gotoWelcome(): void {
     this.router.navigate(['/welcome']);
  }

  saveUserData(): void {
    this.submitted = true;
    let saveUser: User = this.constructFormModelObject();
    this.userService.saveData(saveUser).subscribe(data => {
      this.responseObject = JSON.parse(JSON.stringify(data));      
      const isError = this.responseObject.isError;
      if(isError){
         var list: Error[] = JSON.parse(JSON.stringify(this.responseObject.errorObject));
        // this.constructErrorObject(list);
      }else{
         this.router.navigate(['/succ-user']);
      }
   });
      
  }

  constructFormModelObject() : User {
    let userModel: User = {
      loginName : this.userName.value,
      firstName : this.firstName.value,
      lastName : this.lastName.value,
      password : this.password.value,
      repeatPassword : this.repeatPassword.value,
      encrypted : this.encrypted.value,
      role : this.role.value,
    };
    return  userModel;
  }

  /*
  constructErrorObject (errorList: Error[] ) {
    for(var errorObject of errorList){ 
       if("UniqueValue" === errorObject.errorCode){
          this.userName.setErrors({"notValidInput":errorObject.errorMsg});
       }
       if("ValidPassword" === errorObject.errorCode){
          this.repeatPassword.setErrors({"notValidInput":errorObject.errorMsg});
       }   
    }
  }
  */
  updateData(): void {
    this.submitted = true;
    this.editUser.loginName = this.userName.value;
    this.editUser.firstName = this.firstName.value;
    this.editUser.lastName  = this.lastName.value;
    this.editUser.role      = this.role.value;
    this.editUser.repeatPassword = this.editUser.password;
    console.log(this.editUser); 
    this.userService.updateData(this.editUser).subscribe(data => {
      this.responseObject = JSON.parse(JSON.stringify(data));      
      const isError = this.responseObject.isError;
      if(isError){
         var list: Error[] = JSON.parse(JSON.stringify(this.responseObject.errorObject));
         //this.constructErrorObject(list);
      }else{
         this.router.navigate(['/succ-user']);
      }
   });
  }
}
