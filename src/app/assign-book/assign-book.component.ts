import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-book',
  templateUrl: './assign-book.component.html',
  styleUrls: ['./assign-book.component.css']
})
export class AssignBookComponent implements OnInit {

  closeResult!: string;
  bookList!: any[];
  usersList!: any[];

  constructor(private authService: AuthServiceService,private modalService: NgbModal) { }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
    this.authService.getCurrentBookList().subscribe((result) => {
      this.bookList = result;
    });
    this.authService.getCurrentUsers().subscribe((result) => {
      this.usersList = result;
    });
  }

}
