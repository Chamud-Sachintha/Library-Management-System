import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  usersList!: any[];
  registredMembersCount: number = 0;
  availableBooks: number = 0;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.getRegistredmembersCount();
    this.getAvailableBooksCount();
  }

  getRegistredmembersCount(){
    var userCount = 0;
    this.authService.getCurrentUsers().subscribe((result) => {
      this.usersList = result;

      for(const key in this.usersList){
        userCount += 1;
      }

      this.registredMembersCount = userCount;
    });
  }

  getAvailableBooksCount(){
    var userCount = 0;
    this.authService.getCurrentBookList().subscribe((result) => {
      for(const key in result){
        userCount += 1;
      }

      this.availableBooks = userCount;
    });
  }

}
