import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampService {

  url = "http://localhost:31764/api/Camp/"
  bookURL = "http://localhost:31764/api/Booking/"

  constructor(private http : HttpClient) { }

  public _subject = new BehaviorSubject<any>('');

  emit<T>(data: T){
    this._subject.next(data);
  }

  on<T>(): Observable<T>{
    return this._subject.asObservable();
  }

  getCampList(){
    return this.http.get(`${this.url}campList`);
  }

  getCampListAdmin(){
    return this.http.get(`${this.url}campListAdmin`);
  }


  addCampToDb(data){
    return this.http.post<any>(`${this.url}addCampDb/`,data);
  }

  getCampById(Id){
    return this.http.get(`${this.url}fetchCamp/${Id}`)
  }

  getCampSearch(checkIn, checkOut, capacity){
    return this.http.get(`${this.url}filterSearch/${checkIn}/${checkOut}/${capacity}`)
  }

  deleteCamp(Id){
    return this.http.delete(`${this.url}DeleteCamp/${Id}`);
  }

  addBooking(data){
    console.warn("Service ", data);
    return this.http.post<any>(`${this.bookURL}addBooking/`,data);
  }

  searchBRN(brn){
    return this.http.get(`${this.bookURL}SearchBook/${brn}`);
  }

  editCamp(id, data){
    return this.http.put(`${this.url}UpdateCamp/${id}`, data);
  }

  updateRating(Id, campId, rating){    
    return this.http.delete(`${this.bookURL}UpdateBooking/${Id}/${campId}/${rating}`);
  }

  deleteBook(Id, campId, rating){    
    return this.http.delete(`${this.bookURL}DeleteBooking/${Id}/${campId}/${rating}`);
  }
}
