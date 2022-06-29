import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }
  
  assignBookForUser(assignedBookDetails: any){
    return this.http.post(`${environment.appURI}/assign.json`, assignedBookDetails);
  }

  getAllAssignedBooks(){
    var assignedBooks: any[] = [];

    return this.http.get(`${environment.appURI}/assign.json`).pipe(map((result:any) => {
      for(const key in result){
        if(result.hasOwnProperty(key)){
          assignedBooks.push({...result[key], id: key});
        }
      }

      return assignedBooks;
    }));
  }
}
