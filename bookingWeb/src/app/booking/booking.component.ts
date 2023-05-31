import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampService } from '../service/camp.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  show: boolean= false;
  stay: number; 
  flag: boolean=false;
  totalAmount: any;
  discountCoupons: any = ['DISC1000', 'DISC1500', 'DISC2000'];
  campId: number;
  constructor( private router : Router, private aRouter : ActivatedRoute, private service : CampService, private fb : FormBuilder) { }

  bookingForm = this.fb.group({
    campId: [''],
    coupon: [''],
    address: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    zipCode: ['', Validators.required],
    phoneNo: ['', Validators.required]
  });

  id: number;
  get ba() { return this.bookingForm.get('address')}
  get cn() { return this.bookingForm.get('country')}
  get st() { return this.bookingForm.get('state')}
  get zc() { return this.bookingForm.get('zipCode')}
  get ph() { return this.bookingForm.get('phoneNo')}

  data: any = [];
  refNo: any = "";
  bookedData: any = [];
  calculate: number;
  additionalData = this.fb.group({
    totalStay: ['', Validators.required],
    amount: ['', Validators.required],
    maxPerson: ['', Validators.required],
    stay: ['', Validators.required]
  });

  ngOnInit(): void {
    this.campId=this.aRouter.snapshot.params['id'];
    this.service.getCampById(this.aRouter.snapshot.params['id']).subscribe((res) => {
      console.warn(res);
      this.data=res;  
      if(this.data[0].totalStay > 2 && this.data[0].totalStay < 9) {
        this.show=true
      }
      this.calculateTotal();
    });
  }

  confirmBooking(data){
    if(this.bookingForm.valid){
      data.campId=Number(this.campId);
      this.service.addBooking(data).subscribe((res) => {              
        this.service.searchBRN(res.message).subscribe((data) => {
          this.bookedData=data;
          this.service.emit<any>(this.bookedData);
          this.router.navigateByUrl('/confirmBooking')
        })
      })
    }
    else{
      this.validateAllFields(this.bookingForm)
    }
  }

  applyCoupon(val){
    this.stay = this.data[0].totalStay; 

    for(let i=0; i<this.discountCoupons.length; ++i) {
      if(val == this.discountCoupons[i]){
        if(this.stay == 3 || this.stay == 4){
          if(val == "DISC1000"){
            this.totalAmount = (this.data[0].totalStay*this.data[0].ratePerNight)-1000;
          }
          this.flag=true;
          break;
        }
        else if(this.stay == 5  || this.stay == 6){
          if(val == "DISC1500"){
            this.totalAmount = (this.data[0].totalStay*this.data[0].ratePerNight)-1500;
          }
          this.flag=true;
          break;
        }
        else if(this.stay == 7 || this.stay == 8){
          if(val == "DISC2000"){
            this.totalAmount = (this.data[0].totalStay*this.data[0].ratePerNight)-2000;
          }
          this.flag=true;
          break;
        }
      }
    }
    if(this.flag != true){
      alert("Coupon is not valid.");
    }
  }

  calculateTotal(){
    this.totalAmount = (this.data[0].totalStay * this.data[0].ratePerNight);
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
}
