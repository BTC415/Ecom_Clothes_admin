import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  UserLogin(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data);
  }

  //get all users
  Allusers(): Observable<any> {
    return this.http.get('http://localhost:3000/allusers');
  }
  //send email
  SendEmail(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/sendmail', { email: data });
  }
  //change password
  ForgotPassword(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/forgotpwd', data);
  }
  //userstatus (block & unblock)
  UserStatus(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/userstatus', data);
  }
  //loggedin
  Userloggedin(): Observable<any> {
    return this.http.get('http://localhost:3000/userloggedin', {
      headers: this.getHeaders(),
    });
  }
  getHeaders() {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return headers;
  }
}
