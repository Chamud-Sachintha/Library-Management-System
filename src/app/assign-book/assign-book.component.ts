import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';
import { BookServiceService } from '../services/book-service.service';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-assign-book',
  templateUrl: './assign-book.component.html',
  styleUrls: ['./assign-book.component.css']
})
export class AssignBookComponent implements OnInit {

  assignedBook = {
    "enailAddress": '',
    "isbnNumber": ''
  }

  isReturnedSuccess!: boolean;
  isAssignedSuccess!: boolean;
  selectedBookDetails!: any;
  closeResult!: string;
  bookList!: any[];
  usersList!: any[];
  assignedBookList!: any[];

  constructor(private masterService: MasterService, private bookService: BookServiceService,private userService: UserServiceService, private authService: AuthServiceService, private modalService: NgbModal) { }

  openVerticallyCentered(selectedBook: any,content: any) {
    this.modalService.open(content, { centered: true, size: 'lg'});
    this.selectedBookDetails = selectedBook;
  }

  ngOnInit(): void {
    this.authService.getCurrentBookList().subscribe((result) => {
      this.bookList = result;
    });
    this.authService.getCurrentUsers().subscribe((result) => {
      this.usersList = result;
    });
    this.bookService.getAllAssignedBooks().subscribe((result) => {
      this.assignedBookList = result;
    });
  }

  cleanArray() {
    var x = this.bookList.length;

    while (x >= 0) {
      this.bookList.pop();
      x--;
    }
  }

  tmp!: string[];

  onSearchBook(bookValue: string) {
    if(bookValue){
      this.bookService.getBookDetailsById(bookValue).subscribe((result) => {
        this.bookList = result;
      });
    }else{
      this.authService.getCurrentBookList().subscribe((result) => {
        this.bookList = result;
      });
    }
  }

  search(value: string) {
    if(value){
      this.userService.getSelectedUserById(value).subscribe((result) => {
        this.usersList = result;
      });
    }else{
      this.authService.getCurrentUsers().subscribe((result) => {
        this.usersList = result;
      });
    }
  }

  setAssignBook(selectedUserDetails: any,date: any){
    const completeAssignDetail = { ...this.selectedBookDetails, ...selectedUserDetails, date}

    this.bookService.assignBookForUser(completeAssignDetail).subscribe((result) => {
      this.isAssignedSuccess = true;

      this.bookService.getAllAssignedBooks().subscribe((result) => {
        this.assignedBookList = result;
      });
    });
  }

  onDeleteAssign(bookId: string){
    let confirmDel = confirm("Are you Sure want to Delete This Assign From this User :- ");

    if(confirmDel){
      this.masterService.returnBook(bookId).subscribe((result) => {
        this.isReturnedSuccess = true;

        this.bookService.getAllAssignedBooks().subscribe((result) => {
          this.assignedBookList = result;
        });
      });
    }
  }

}
