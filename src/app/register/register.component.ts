import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    dob: null,
    role: null,
  };

  isSuccessful = false;
  errorMessage = '';
  isSignUpFailed = false

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
    //$('.datepicker').datepicker();
  }

  onSubmit(): void {
    console.log("this.form", this.form);
    this.form.role = this.form.email == 'admin@gmail.com' ? 'Admin' : 'User';
    console.log("this.formfdff", this.form);
    this.AuthService.register(this.form).subscribe(
      res => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err => {
        this.isSignUpFailed = true;
        var errResponse = JSON.parse(err.error);
        this.errorMessage = errResponse.message;
      });
  }

}
