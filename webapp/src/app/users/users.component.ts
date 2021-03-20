import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { User, ResponseDTO, Error } from '../model/model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
/* tslint:disable */
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  toggle: boolean = false;
  users: User[] = null;
  responseObject : ResponseDTO<User[],Error> = null;

  @ViewChild('confirmModel', { static: true }) confirmModel: ModalDirective;
  @ViewChild('successModel', { static: true }) successModel: ModalDirective;
  @ViewChild('failureModel', { static: true }) failureModel: ModalDirective;
  deleteId: number = null;

  // Data table
  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

   //Form Related
  userForm : FormGroup;
  userName = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');

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
    this.ngOnInitTableOptions();    
  }

  ngOnInitFormBuilder() {
     this.userForm = this.formBuilder.group({
        userName: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
     });
  }
  ngOnInitTableOptions(): void {
    this.dtOptions = {     
      columns: [{
        title: 'ID',        
      }, {
        title: 'User Name',
      }, {
        title: 'First Name',
      }, {
        title: 'Last Name',        
      }, {
        title: 'Actions',        
      }]
    };
  }

  getAllUsers(): void {
    this.spinner.show("spinner",this.spinnerConfig);
    let searchData: User = {
        loginName : this.userName.value ? this.userName.value : '',
        firstName : this.firstName.value ? this.firstName.value: '' ,
        lastName : this.lastName.value ? this.lastName.value : '',
    }   

    this.userService.getFilterData(searchData).subscribe(data => {
      this.responseObject = JSON.parse(JSON.stringify(data));
      this.spinner.hide("spinner");
      if(this.responseObject.isError){
           //let errorObject = this.responseObject.errorObject;
           //alert(errorObject.errorMsg);  
      }else{
         this.users = this.responseObject.successObject;
         this.rerender();
      }
      
     },error => {
         this.spinner.hide("spinner");
         alert(error);
     });  
  }

  clickEvent() {
    this.toggle = !this.toggle;
  }

   ngAfterViewInit(): void {
     this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  updateData(userId : number): void {
    this.callAndGetData(userId,'/user');    
  }

  callAndGetData(userId: number, url: string) : void {
    this.spinner.show("spinner",this.spinnerConfig);
    this.userService.getData(userId).subscribe(data => {
      let viewResponseObject : ResponseDTO<User,Error> = null;
      viewResponseObject = JSON.parse(JSON.stringify(data));       
      const isError = viewResponseObject.isError;
      if(isError){
        //let errorObject: Error = JSON.parse(JSON.stringify(viewResponseObject.errorObject));
        //const alertMessage = errorObject.errorMsg;
        this.spinner.hide("spinner");
        //alert(alertMessage); 
      }else {
        let userObject: User = JSON.parse(JSON.stringify(viewResponseObject.successObject));
        const navigationExtras: NavigationExtras = {
          state: {
            userObject: userObject,           
          }
        };
        this.spinner.hide("spinner");
        this.router.navigate([url],navigationExtras);
      }
    }); 
  }

  viewData(userId : number): void {
    this.callAndGetData(userId,'/view-user/'+userId);    
  }

  deleteData(userId: number) {
    this.deleteId = userId;
    this.confirmModel.show();
  }

  cancelDelete(): void {
     this.confirmModel.hide();
  }

  successModelClose() : void {
     this.successModel.hide();
     this.router.navigate(['/welcome']);
  }
   
  failureModelClose(): void {
    this.failureModel.hide();
    this.router.navigate(['/welcome']);
  }

  callDeleteFn(): void {
    this.confirmModel.hide();    
    this.spinner.show("spinner",this.spinnerConfig);
    this.userService.deleteData(this.deleteId).subscribe(data => {
         let viewResponseObject : ResponseDTO<User,Error> = null;
         viewResponseObject = JSON.parse(JSON.stringify(data)); 
         const isError = viewResponseObject.isError;
         this.spinner.hide("spinner");
         if(isError){
            //let errorObject: Error = JSON.parse(JSON.stringify(viewResponseObject.errorObject));
            //const alertMessage = errorObject.errorMsg;
            //alert(alertMessage); 
         }else{
             this.successModel.show();
         }
      },
      error => {
          this.spinner.hide("spinner");
          alert(error);
            this.failureModel.show();
      }
     );
  }
}
