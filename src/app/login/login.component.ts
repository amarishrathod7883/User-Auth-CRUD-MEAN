import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { DataSharingService } from '../_services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null,
  };

  isLoggedIn = false;
  isLoggedInFailed = false;
  errorMessage = '';

  constructor(private AuthService: AuthService, private DataSharingService: DataSharingService, private router: Router) { }

  ngOnInit(): void {
    if(!this.AuthService.isEmptyObject())
    {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void 
  {
    console.log("this.form", this.form);
    this.AuthService.login(this.form).subscribe(
      res => {
        console.log('login', res.data);
        this.isLoggedIn = true;
        this.isLoggedInFailed = false;
        this.AuthService.setUser(res.data);
        this.DataSharingService.isUserLoggedIn.next(true);
        this.router.navigate(['blog']);
      },
      err => {
        var errResponse = JSON.parse(err.error);
        this.isLoggedInFailed = true;
        this.errorMessage = errResponse.message;
      });
  }

}
