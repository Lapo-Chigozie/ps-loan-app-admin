import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  static getItem: any;

  constructor() { }

  public static setLoginSessionIdentity(LoginKeySession: string, accountId: any):boolean {
     try{
      localStorage.setItem(LoginKeySession, accountId);
      return true;
     }catch(e){
      return false;
     }
  }

  public static getLoginSessionIdentity(LoginKeySession: string): any {
    try{
      return localStorage.getItem(LoginKeySession);
    }
    catch(err){
      return "";
    }
  }

 

  public setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public  getItem(key: string): any {
    try{
      return localStorage.getItem(key);
    }
    catch(err){
      return null;
    }
  }

  public setBool(key: string, value: boolean) {
    localStorage.setItem(key, String(value));
  }

  public getBool(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }

  public setObject(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // getObject(key: string): object {
  //   return JSON.parse(localStorage.getItem(key));
  // }
}
