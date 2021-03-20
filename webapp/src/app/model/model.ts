/* tslint:disable */
export class BaseModel {
    createdBy?        : string;
    createdName?      : string;
    createdTs?        : Date;
    lastModifiedBy?   : string;
    lastModifiedName? : string;
    lastModifiedTs?   : Date;
    version?          : number;
}

export class Account extends BaseModel {
    accountId?  : string;
    name?       : string;
    type?       : string;
    amount?     : number;
}

export class Error {
  constraintType? :string;
  message?        :string;
  path?           :string;
  value?          :string;
}

export class ResponseDTO<S,E> {
  isError?       : boolean;
  successObject? : S;
  errorObject?   : E;
}

export class User extends BaseModel {
   id?                 : number;
   loginName?          : string;
   password?           : string;
   repeatPassword?     : string;
   lastLogin?          : Date;
   accountExpired?     : boolean;
   accountLocked?      : boolean;
   credentialsExpired? : boolean;
   enabled?            : boolean;
   firstName?          : string;
   lastName?           : string;
   encrypted?          : boolean;
   createdName?        : string;
   lastModifiedName?   : string;
   role?               : string;
   authdata?           : string;
}

export class ChangePassword {
  userId?         : number;
  password?       : string;
  repeatPassword? : string;
  encrypted?      : boolean;
}

export class AppUserAuth {
  userName: string = "";
  basicToken: string = "";
  isAuthenticated: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;
}

