import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  url = "http://localhost:31764/api/Admin/"
  
  constructor( private http : HttpClient) { }

  logIn(adminLogin : any){
    return this.http.post<any>(`${this.url}authenticate`, adminLogin);
  }

}
