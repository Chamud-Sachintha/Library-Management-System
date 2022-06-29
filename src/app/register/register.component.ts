import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from '../services/auth-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedUser : string[] = [];
  usersList!: any[];
  isSuccess = false;
  selectedUserId!: string;
  isPasswordMismatch = false;

  newUser = {
    fullName: '',
    emailAddress: '',
    password: '',
  }

  registerForm!: FormGroup;
  updateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthServiceService
              ,private userService: UserServiceService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['' , Validators.required]
    });

    this.updateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['' , Validators.required]
    });

    this.getCurrentUsersList();
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
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

  onUpdateValues(selectedUser:any){
    this.selectedUserId = selectedUser.id;

    this.updateForm.patchValue({
      fullName: selectedUser.fullName,
      emailAddress: selectedUser.emailAddress,
      password: selectedUser.password
    });
  }

  onUpdate(){
    if(this.updateForm.get("password")?.value == this.updateForm.get("confPassword")?.value){
      this.userService.updateUserById(this.updateForm.value,this.selectedUserId).subscribe((result) => {
        this.isSuccess = true;
      });
    }else{
      console.log("Password Doesn't Match.");
    }
  }

}
