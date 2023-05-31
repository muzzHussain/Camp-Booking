import { Component, Input, OnInit } from '@angular/core';
import { CampService } from '../service/camp.service'

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  constructor( private service : CampService) { }

  bookedData: any;

  ngOnInit(): void {
    this.service.on<any>().subscribe(res => {
      this.bookedData=res;      
    })
  }

}
