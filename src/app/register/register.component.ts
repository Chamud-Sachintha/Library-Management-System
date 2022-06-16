import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usersList!: any[];
  isSuccess = false;
  isPasswordMismatch = false;

  newUser = {
    fullName: '',
    emailAddress: '',
    password: '',
  }

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['' , Validators.required]
    });

    this.getCurrentUsersList();
  }

  onSubmit(){
    this.newUser.fullName = this.registerForm.get("fullName")?.value;
    this.newUser.emailAddress = this.registerForm.get("emailAddress")?.value;
    this.newUser.password = this.registerForm.get("password")?.value;

    if(this.newUser.password != this.registerForm.get("confPassword")?.value){
      this.isPasswordMismatch = true;
    }else{
      this.isPasswordMismatch = false;
      this.authService.saveUser(this.newUser).subscribe((result) => {
        this.isSuccess = true;
        this.getCurrentUsersList();
      });
    }
  }

  getCurrentUsersList(){
    this.authService.getCurrentUsers().subscribe((result) => {
      this.usersList = result;
    });
  }

}
