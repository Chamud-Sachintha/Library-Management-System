import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getSelectedUserById(userEmail:string){
    var users: any[] = [];

    return this.http.get(`${environment.appURI}/users.json`).pipe(map((res:any) => {

      for(const key in res){
        if(res.hasOwnProperty(key)){
          users.push({...res[key], id: key});
        }
      }
      
      for(const user in users){
        if(users[user]["emailAddress"] == userEmail){
          users = users[user];

          break;
        }else{
          continue;
        }
      }

      return users;
    }));
  }

  updateUserById(selectedUser: any, id: string){
    return this.http.put(`${environment.appURI}/users/${id}.json`, selectedUser);
  }
}
