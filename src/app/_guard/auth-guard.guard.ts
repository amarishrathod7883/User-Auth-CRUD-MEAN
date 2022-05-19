import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private AuthService: AuthService) { }

  canActivate(): boolean {
    if(!this.AuthService.isEmptyObject())
    {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}
