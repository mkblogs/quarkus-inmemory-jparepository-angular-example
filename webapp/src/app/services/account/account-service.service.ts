import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
/* tslint:disable */
export class AccountServiceService {

  private accountURL  = environment.apiUrl + "/api/account";
  private accountSearchURL  = environment.apiUrl + "/api/account/search-filter";

  constructor(private http: HttpClient) { }

  public getFilterData(account: Account): Observable<any> {
    const httpParams = new HttpParams()
                        .append("accountName",account.name)
                        .append("accountType",account.type)
                        .append("amount",account.amount+"");
    const params = {
      params : httpParams,
    };                      
    return this.http.get(this.accountSearchURL,params);
  }

  public saveData(account: Account): Observable<any> {    
    return this.http.post(this.accountURL,account);
  }

  public updateData(account: Account): Observable<any> {    
    return this.http.put(this.accountURL,account);
  }

  public getData(accountId: number): Observable<any> {
    return this.http.get(this.accountURL+"/"+accountId);
  }

  public deleteData(accountId: number): Observable<any> {
    return this.http.delete(this.accountURL+"/"+accountId);
  }
 
}
