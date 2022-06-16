import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router,private http: HttpClient) { }

  saveUser(newUser:any){
    return this.http.post(
      `${environment.appURI}/users.json`,
      newUser
    );
  }

  loginUser(emailAddress:string,password:string):Observable<any>{

    var users: any[] = [];

    return this.http.get(`${environment.appURI}/users.json`).pipe(map((res:any) => {
      var isSuccess = false;

      for(const key in res){
        if(res.hasOwnProperty(key)){
          users.push({...res[key], id: key});
        }
      }
      
      for(const user in users){
        if(users[user]["emailAddress"] == emailAddress && users[user]["password"] == password){
          isSuccess = true;

          break;
        }else{
          continue;
        }
      }

      return isSuccess;
    }));
  }

  getCurrentUsers():Observable<any>{
    var users: any[] = [];

    return this.http.get(`${environment.appURI}/users.json`).pipe(map((result:any) => {
      for(const key in result){
        if(result.hasOwnProperty(key)){
          users.push({...result[key], id: key});
        }
      }

      return users;
    }));
  }

}
