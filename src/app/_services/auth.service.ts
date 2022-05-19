import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData): Observable<any> {
    return this.http.post(AUTH_API + 'signin', loginData, {responseType: 'text'}).pipe((map(res => JSON.parse(res))));
  }

  register(formdata): Observable<any> {
    return this.http.post(AUTH_API + 'signup', formdata, {responseType: 'text'}).pipe((map(res => JSON.parse(res))));
  }

  logOut(): void {
    window.sessionStorage.clear();
  }

  isEmptyObject() {
    return (this.getUser() && (Object.keys(this.getUser()).length === 0));
  }

  public setUser(data): void {
    window.sessionStorage.removeItem(USER_KEY);
    const user = window.sessionStorage.setItem(USER_KEY, JSON.stringify(data));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user);
    }
    return {};
  }
}
