import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  isLoggedIn(){
    return sessionStorage.getItem("userName")!=null;
  }

  returnBook(bookId: string){
    return this.http.delete(`${environment.appURI}/assign/${bookId}.json`);
  }
}
