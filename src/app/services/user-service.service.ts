import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getSelectedUserById(userValue:string){
    var userDetail : any[] = [];
    var selectedUser : any[] = [];

    return this.http.get(`${environment.appURI}/users.json`).pipe((map((res: any) => {
      for(const key in res){
        if(res.hasOwnProperty(key)){
          userDetail.push({ ...res[key], id: key });
        }
      }

      for(const user in userDetail){
        if(userDetail[user]["emailAddress"] == userValue || userDetail[user]["fullName"].includes(userValue)){
          selectedUser.push(userDetail[user]);
        }
      }

      return selectedUser;
    })));
  }

  updateUserById(selectedUser: any, id: string){
    return this.http.put(`${environment.appURI}/users/${id}.json`, selectedUser);
  }

  deleteUserById(userId: string){
    return this.http.delete(`${environment.appURI}/users/${userId}.json`);
  }

}
