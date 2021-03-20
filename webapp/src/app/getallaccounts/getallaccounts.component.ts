import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AccountServiceService } from '../services/account/account-service.service';
import { ResponseDTO, Account, Error } from '../model/model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-getallaccounts',
  templateUrl: './getallaccounts.component.html',
  styleUrls: ['./getallaccounts.component.css']
})
/* tslint:disable */
export class GetallaccountsComponent implements OnInit,AfterViewInit, OnDestroy {

  toggle: boolean = false;
  public accounts = [];
  responseObject : ResponseDTO<Account[],Error> = null;

  
  @ViewChild('confirmModel', { static: true }) confirmModel: ModalDirective;
  @ViewChild('successModel', { static: true }) successModel: ModalDirective;
  @ViewChild('failureModel', { static: true }) failureModel: ModalDirective;
  deleteId: number = null;

  //spinner
  spinnerConfig = {  
        type: 'timer',        
        bdColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        fullScreen: true,        
    }

  // Data table
  @ViewChild(DataTableDirective, {static: false})
  private datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
 
  //Form Related
  submitAccountForm: FormGroup;
  accountName = new FormControl('');
  accountType = new FormControl('');
  accountAmount = new FormControl('');

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountServiceService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {    
    this.ngOnInitFormBuilder();
    this.ngOnInitTableOptions();
  }

  ngOnInitFormBuilder() {
     this.submitAccountForm = this.formBuilder.group({
        accountName: this.accountName,
        accountType: this.accountType,
        accountAmount: this.accountAmount
     });
  }

  ngOnInitTableOptions() {
    this.dtOptions = {     
      columns: [{
        title: 'ID',        
      }, {
        title: 'Account Name',
      }, {
        title: 'Account Type',
      }, {
        title: 'Amount',        
      }, {
        title: 'Actions',        
      }]
    };
  }

  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

   clickEvent() {
    this.toggle = !this.toggle;
  }

  getAccountData() {
    this.spinner.show("spinner",this.spinnerConfig); 
    let searchAccount: Account = {
      name : this.accountName.value ? this.accountName.value : '',
      type : this.accountType.value ? this.accountType.value: '' ,
      amount : this.accountAmount.value ? this.accountAmount.value : '',
    }
    this.accountService.getFilterData(searchAccount)
    .subscribe(data => {
          this.accounts = JSON.parse(JSON.stringify(data)); 
          this.rerender();
          this.spinner.hide("spinner");
      },
      error => {
        this.spinner.hide("spinner");
        alert(error);
      });
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

  updateAccount(accountId: number): void {
    this.spinner.show("spinner",this.spinnerConfig);
    this.accountService.getData(accountId).subscribe(data => {
      let accountObject: Account = JSON.parse(JSON.stringify(data));
      const navigationExtras: NavigationExtras = {
        state: {
          accountObject: accountObject,           
        }
      };
      this.router.navigate(['/account'],navigationExtras);      
   },
   httpErrorResponse => {
     alert(httpErrorResponse);
   }   
   ); 
  }

  viewAccount(accountId: number): void {
    this.accountService.getData(accountId).subscribe(data => {
    let accountObject: Account = JSON.parse(JSON.stringify(data));
    accountObject.accountId = accountId.toString();
    const navigationExtras: NavigationExtras = {
      state: {
        accountObject: accountObject,           
      }
    };
    this.router.navigate(['/view-account/'+accountId],navigationExtras);
   },
   httpErrorResponse => {
     alert(httpErrorResponse);
   }
   ); 
  }
  
  deleteAccount(accountId: number) {
    this.deleteId = accountId;
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
    this.accountService.deleteData(this.deleteId).subscribe(data => {
         this.spinner.hide("spinner");
         this.successModel.show();
     },
      error => {
          this.spinner.hide("spinner");
          alert(error);
          this.failureModel.show();
      }
     );
  }
}
