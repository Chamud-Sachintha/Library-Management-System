import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFail = false;

  users!: any[];
  loginEmail!: string;
  loginPassword!: string;
  loginForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,private authService: AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: '',
      password: ''
    });
  }

  onSubmit(){
    this.loginEmail = this.loginForm.get("emailAddress")?.value;
    this.loginPassword = this.loginForm.get("password")?.value;

    // this.authService.loginUser().subscribe((result) => {
    //   console.log(result);
    // });

    this.authService.loginUser(this.loginEmail,this.loginPassword).subscribe((result) => {
      if(result){
        sessionStorage.setItem("userName", this.loginEmail);
        this.router.navigate(['/home']);
      }else{
        this.isFail = true;
        this.router.navigate(['']);
      }
    });
  }

}
