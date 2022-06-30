import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  isLoggedIn(){
    return sessionStorage.getItem("userName")!=null;
  }
}
