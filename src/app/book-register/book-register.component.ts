import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-book-register',
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.css']
})
export class BookRegisterComponent implements OnInit {

  bookList!: any[];
  isSuccess = false;

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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

}
