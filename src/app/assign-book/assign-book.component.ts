import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';
import { BookServiceService } from '../services/book-service.service';

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

  isAssignedSuccess!: boolean;
  selectedBookDetails!: any;
  closeResult!: string;
  bookList!: any[];
  usersList!: any[];
  assignedBookList!: any[];

  constructor(private bookService: BookServiceService,private userService: UserServiceService, private authService: AuthServiceService, private modalService: NgbModal) { }

  openVerticallyCentered(selectedBook: any,content: any) {
    this.modalService.open(content, { centered: true });
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
    if (bookValue.length <= 0) {
      this.authService.getCurrentBookList().subscribe((result) => {
        this.bookList = result;
      });
    } else {
      for (const eachBook in this.bookList) {
        var bookTitle = this.bookList[eachBook]["bookTitle"].includes(bookValue.charAt(0).toUpperCase() + bookValue.slice(1));

        if (bookTitle) {
          this.bookList = [];
          this.tmp = this.bookList[eachBook];
        } else {
          this.bookList = [];
        }
      }
    }
  }

  search(value: string) {
    this.userService.getSelectedUserById(value).subscribe((result) => {
      console.log(result);
    });
  }

  setAssignBook(selectedUserDetails: any){
    const completeAssignDetail = { ...this.selectedBookDetails, ...selectedUserDetails }

    this.bookService.assignBookForUser(completeAssignDetail).subscribe((result) => {
      this.isAssignedSuccess = true;
    });
  }

}
