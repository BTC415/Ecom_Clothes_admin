import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  env: any = environment;
  constructor(private http: HttpClient) {}

  UserLogin(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'login', data);
  }

  //get all users
  Allusers(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'allusers');
  }
  //send email
  SendEmail(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'sendmail', { email: data });
  }
  //change password
  ForgotPassword(data: any): Observable<any> {
    return this.http.put(this.env.apiUrl + 'forgotpwd', data);
  }
  //userstatus (block & unblock)
  UserStatus(data: any): Observable<any> {
    return this.http.put(this.env.apiUrl + 'userstatus', data);
  }

  //add Product
  AddProduct(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'addproduct', data);
  }

  //show Product
  ShowProducts(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'showproduct');
  }

  //delete product
  DeleteProduct(_id: any): Observable<any> {
    return this.http.delete(this.env.apiUrl + 'deleteproduct', {
      params: { _id: _id },
    });
  }

  //get one Product
  GetOneProduct(_id: any): Observable<any> {
    return this.http.get(this.env.apiUrl + 'product/' + _id);
  }

  //delete images (update product)
  UpdateImages(pid: any, iid: any): Observable<any> {
    return this.http.delete(this.env.apiUrl + 'deleteimage', {
      params: { pid: pid, iid: iid },
    });
  }

  // update Products
  UpdateProduct(data: any): Observable<any> {
    return this.http.put(this.env.apiUrl + 'updateproduct', data);
  }

  //get contact data
  getContactData():Observable<any>{
    return this.http.get("http://localhost:3000/getcontactdata")
  }

  //loggedin
  Userloggedin(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'userloggedin', {
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
