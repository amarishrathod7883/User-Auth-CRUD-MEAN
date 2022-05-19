import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/blogs/';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get(AUTH_API + 'getAllCategory', { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }

  getAllBlogs(searchCondition): Observable<any> {
    return this.http.post(AUTH_API + 'getAllBlogs', searchCondition, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }


  getSingleBlog(_id): Observable<any> {
    return this.http.get(AUTH_API + 'getSingleBlog/'+ _id, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }


  createUpdateBlog(id, data): Observable<any> {
    return this.http.put(AUTH_API + 'createUpdateBlog/' + id, data, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }


  removeBlog(id): Observable<any> {
    return this.http.get(AUTH_API + 'removeBlog/' + id, { responseType: 'text'}).pipe(map(res => JSON.parse(res)));
  }
}
