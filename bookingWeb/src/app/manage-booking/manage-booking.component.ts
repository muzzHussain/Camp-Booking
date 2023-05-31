import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CampService } from '../service/camp.service'

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  constructor( private service : CampService) { }

  searchForm: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      BRN: new FormControl('', Validators.required)
    });
  }

  stars: number[] = [1, 2, 3, 4, 5];
  selectedStar: number;
  alert: boolean = false;
  show: boolean = false;
  showEdit: boolean = false;
  newDate: string = "";
  dateFormat = "yyyy-MM-dd";
  language = "en";
  collection: any = []
  get cn() { return this.searchForm.get('BRN')}

  searchBooking(data){
    if(this.searchForm.valid){
      
      this.service.searchBRN(data.BRN.toUpperCase()).subscribe((res) => {
        this.collection = res;
        if(this.collection.length < 1){
          this.alert=true
          return
        }        
        this.show=true;
        
        this.service.getCampById(this.collection[0].campId).subscribe((res) => {
          console.warn(this.formatFormDate(res[0].checkOut));
          if(this.formatFormDate(res[0].checkOut) < this.formatFormDate(Date())){
            this.showEdit=true;
            return
          }
          this.showEdit=false;
        })        
      })
    }
    else{
      this.validateAllFields(this.searchForm)
    }
  }

  formatFormDate(date: any) {
    this.newDate =  formatDate(date, this.dateFormat, this.language);    
    return this.newDate;
  }

  cancelBooking(){
    this.service.deleteBook(Number(this.collection[0].id), Number(this.collection[0].campId), Number(this.selectedStar))
    .subscribe()
  }

  countStar(star){
    this.selectedStar = star;
  }

  updateRating(){
    this.service.updateRating(Number(this.collection[0].id), Number(this.collection[0].campId), Number(this.selectedStar))
    .subscribe()
  }

  private validateAllFields(formgroup : FormGroup) {
    Object.keys(formgroup.controls).forEach(field => {
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({ onlySelf: true});
      }
      else if(control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    })
  }

  closeAlert(){
    this.alert=false;
  }

}
