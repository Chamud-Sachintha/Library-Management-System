import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from '../services/auth-service.service';
import { BookServiceService } from '../services/book-service.service';

@Component({
  selector: 'app-book-register',
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.css']
})
export class BookRegisterComponent implements OnInit {

  selectedBookId!: string;
  bookList!: any[];
  isSuccess = false;

  registerForm!: FormGroup;
  bookUpdateForm!: FormGroup;

  constructor(private bookService: BookServiceService, private formBuilder: FormBuilder,private authService: AuthServiceService,private modalService: NgbModal) { }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      isbnNumber: ['', Validators.required],
      bookTitle: ['', Validators.required],
      authorName: ['', Validators.required],
      pubYear: ['' , Validators.required]
    });

    this.bookUpdateForm = this.formBuilder.group({
      isbnNumber: ['', Validators.required],
      bookTitle: ['', Validators.required],
      authorName: ['', Validators.required],
      pubYear: ['' , Validators.required]
    });

    this.getCurrentBookList();
  }

  onSubmit(){
    this.authService.saveBook(this.registerForm.value).subscribe((result) => {
      this.isSuccess = true;
    });
  }

  getCurrentBookList(){
    this.authService.getCurrentBookList().subscribe((result) => {
      this.bookList = result;
    });
  }

  onUpdateValues(selectedBook:any){
    this.selectedBookId = selectedBook.id;

    this.bookUpdateForm.patchValue({
      isbnNumber: selectedBook.isbnNumber,
      bookTitle: selectedBook.bookTitle,
      authorName: selectedBook.authorName,
      pubYear: selectedBook.pubYear
    });
  }

  onUpdate(){
    this.bookService.updateBookDetailsById(this.bookUpdateForm.value,this.selectedBookId).subscribe((result) => {
      this.isSuccess = true;
    });
  }

  onDelete(bookId: string){
    let isConfirm = confirm("Are you Want to Sure Delete This Book :- ");

    if(isConfirm){
      this.bookService.deleteBookDetailsById(bookId).subscribe((result) => {
        this.isSuccess = true;
      });
    }
  }

}
