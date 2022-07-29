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

  //add Product
  AddProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/addproduct', data);
  }

  //show Product
  ShowProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/showproduct');
  }

  //delete product
  DeleteProduct(_id: any): Observable<any> {
    return this.http.delete('http://localhost:3000/deleteproduct', {
      params: { _id: _id },
    });
  }

  //get one Product
  GetOneProduct(_id: any): Observable<any> {
    return this.http.get('http://localhost:3000/product/' + _id);
  }

  //delete images (update product)
  UpdateImages(pid: any, iid: any): Observable<any> {
    return this.http.delete('http://localhost:3000/deleteimage', {
      params: { pid: pid, iid: iid },
    });
  }

  // update Products
  UpdateProduct(data: any): Observable<any> {
    return this.http.put('http://localhost:3000/updateproduct', data);
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
