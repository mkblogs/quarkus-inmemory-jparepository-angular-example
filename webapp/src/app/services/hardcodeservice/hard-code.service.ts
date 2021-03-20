import { Injectable } from '@angular/core';
import accounts from './../../../assets/data/account.json';
import users from './../../../assets/data/users.json';

@Injectable({
  providedIn: 'root'
})
export class HardCodeService {

  constructor() {}

   getAccounts() {
     return accounts;
   }

   getUsers() {
     return users;
   }
}
