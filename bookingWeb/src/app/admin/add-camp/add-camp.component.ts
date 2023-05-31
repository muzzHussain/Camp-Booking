import { HttpClient } from '@angular/common/http';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { Observable, Observer } from 'rxjs';
import { CampService } from '../../service/camp.service';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})
export class AddCampComponent implements OnInit {

  addCamp! : FormGroup;
  alert: boolean = false;
  // imgPath: string;
  imageUrl: string;
  base64Image: any;
  constructor( private service : CampService, private fb : FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
    this.addCamp = this.fb.group({
      campName: ['', Validators.required],
      ratePerNight: ['', Validators.required],
      capacity: ['', Validators.required],
      totalStay: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      description: ['', Validators.required],
      Image: ['']
    });
  }

  getImage(imgURL: string){
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

  

  get cn() { return this.addCamp.get('campName')}
  get rt() { return this.addCamp.get('ratePerNight')}
  get cp() { return this.addCamp.get('capacity')}
  get ts() { return this.addCamp.get('totalStay')}
  get ci() { return this.addCamp.get('checkIn')}
  get co() { return this.addCamp.get('checkOut')}
  get d() { return this.addCamp.get('description')}
  get iu() { return this.addCamp.get('Image')}

  onAddNewCamp(){
    if(this.addCamp.valid){
     
      this.service.addCampToDb(this.addCamp.value).subscribe((res) => {
        console.warn(res);
        this.alert=true;
      })
    }
    else{
      //alert('Form is invalid');
      this.validateAllFields(this.addCamp)
    }
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
