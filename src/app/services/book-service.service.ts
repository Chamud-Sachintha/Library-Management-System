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

  getBookDetailsById(bookValue: string){
    var bookDetail : any[] = [];
    var selectedBook : any[] = [];

    return this.http.get(`${environment.appURI}/books.json`).pipe((map((res: any) => {
      for(const key in res){
        if(res.hasOwnProperty(key)){
          selectedBook.push({ ...res[key], id: key });
        }
      }

      for(const book in selectedBook){
        if(selectedBook[book]["isbnNumber"].includes(bookValue) || selectedBook[book]["bookTitle"].includes(bookValue)){
          bookDetail.push(selectedBook[book]);
        }
      }

      return bookDetail;
    })));
  }

  updateBookDetailsById(selectedBookDetail: any,selectedBookId: string){
    return this.http.put(`${environment.appURI}/books/${selectedBookId}.json`, selectedBookDetail);
  }

  deleteBookDetailsById(bookId: string){
    return this.http.delete(`${environment.appURI}/books/${bookId}.json`);
  }
}
