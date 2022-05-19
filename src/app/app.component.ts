import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { DataSharingService } from './_services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  email?: string;
  role?: string;

  constructor(private router: Router, private DataSharingService: DataSharingService, private AuthService: AuthService)
  {
    this.DataSharingService.isUserLoggedIn.subscribe( value => {
      if(!this.AuthService.isEmptyObject())
      {
        this.isLoggedIn = true;
        const user = this.AuthService.getUser();
        this.email = user.email;
        this.role = user.role;
      }
      console.log("this.isLoggedIn", this.isLoggedIn);
    });
  }

  ngOnInit(): void 
  {
  }

  logout(): void
  {
    this.AuthService.logOut();
    this.router.navigate(['login'])
  }
}
