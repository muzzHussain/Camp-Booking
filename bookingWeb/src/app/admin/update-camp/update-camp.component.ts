import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Observer } from 'rxjs';
import { CampService } from '../../service/camp.service'

@Component({
  selector: 'app-update-camp',
  templateUrl: './update-camp.component.html',
  styleUrls: ['./update-camp.component.css']
})
export class UpdateCampComponent implements OnInit {

  alert: boolean = false;
  imgPath: string;
  collection: any;
  dat: any="";
  imageUrl: string;
  base64Image: any;
  dateFormat = "yyyy-MM-dd";
  language = "en";
  url: string;
  constructor( private service : CampService, private router : ActivatedRoute, private route : Router) { }
  
  editCamp : FormGroup = new FormGroup({
    CampName: new FormControl('', Validators.required),
    RatePerNight: new FormControl('', Validators.required),
    Capacity: new FormControl('', Validators.required),
    TotalStay: new FormControl('', Validators.required),
    CheckIn: new FormControl('', Validators.required),
    CheckOut: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Image: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    this.service.getCampById(this.router.snapshot.params['id']).subscribe((res:any) => {
      this.collection = res;
      this.editCamp = new FormGroup({
        CampName: new FormControl(this.collection[0].campName),
        RatePerNight: new FormControl(this.collection[0].ratePerNight),
        Capacity: new FormControl(this.collection[0].capacity),
        TotalStay: new FormControl(this.collection[0].totalStay),
        CheckIn: new FormControl(this.formatFormDate(this.collection[0].checkIn)),
        CheckOut: new FormControl(this.formatFormDate(this.collection[0].checkOut)),
        Description: new FormControl(this.collection[0].description),
        Image: new FormControl(this.getImage(this.collection[0].image))
      })
      //console.warn("edit camp", this.editCamp.value);
    })
  }

  formatFormDate(date: any) {
    this.dat =  formatDate(date, this.dateFormat, this.language);    
    return this.dat;
  }


  get cn() { return this.editCamp.get('CampName')}
  get rt() { return this.editCamp.get('RatePerNight')}
  get cp() { return this.editCamp.get('Capacity')}
  get ts() { return this.editCamp.get('TotalStay')}
  get ci() { return this.editCamp.get('CheckIn')}
  get co() { return this.editCamp.get('CheckOut')}
  get d() { return this.editCamp.get('Description')}
  get iu() { return this.editCamp.get('Image')}


  onEditCamp(){
    this.service.editCamp(this.router.snapshot.params['id'], this.editCamp.value).subscribe(res => {
      alert("Success! Camp Updated.");
      this.route.navigateByUrl('/Admin/Dashboard')
    })
  }

  getImage(imgURL: string){
    this.imageUrl=imgURL;
    this.getBase64ImageFromURL(this.imageUrl).subscribe(base64data => {
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });
  }

  getImageURL(imgURL: string){
    this.imageUrl=imgURL;
    this.getBase64ImageFromURL(this.imageUrl).subscribe(base64data => {
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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

  validateFile(name){
    var ext = name.substring(name.lastIndexOf('.')+1);
    if(ext.toLowerCase() == 'png'){
      return true;
    }
    else if(ext.toLowerCase() == 'jpg'){
      return true;
    }
    else if(ext.toLowerCase() == 'jpeg'){
      return true;
    }
    else{
      return false;
    }
  }

  closeAlert(){
    this.alert=false;
  }
}
