import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails!: any;
  userName!: any;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userName") != null){
      this.userName = sessionStorage.getItem('userName');
  
      this.userService.getSelectedUserById(this.userName).subscribe((result: any) => {
        this.userDetails = { ...result }
        console.log(this.userDetails);
      });
    }
  }

}
