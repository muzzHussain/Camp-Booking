import { Component, OnInit } from '@angular/core';
import { CampService } from '../service/camp.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  config: any;
  constructor( private service : CampService, private builder : FormBuilder, private router : ActivatedRoute) { }

  page = 1;
  pageSize = 2;
  totalItems: any;
  campList: any = []; 
  dateFormat = "yyyy-MM-dd";
  language = "en";
  minDate: any = "";
  nextDate: any = new Date();
  searchForm : FormGroup;
  show=false;

  ngOnInit(): void {
    this.searchForm = this.builder.group({
      checkIn : new FormControl(this.formatFormDate(new Date())),
      checkOut : new FormControl(this.formatFormNextDate(new Date())),
      capacity : new FormControl()
    });
    this.service.getCampList().subscribe((data) => {      
      this.campList = data;
      this.pagination();
    })
  }

  pagination(){
    this.config = {
      itemsPerPage: 2,
      currentPage: 1,
      totalItem: this.campList.length
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  formatFormDate(date: Date) {
    this.minDate =  formatDate(date, this.dateFormat, this.language);    
    return this.minDate;
  }

  formatFormNextDate(date: Date) {
    this.nextDate = date;
    this.nextDate.setDate(this.nextDate.getDate() + 1);
    this.nextDate = formatDate(this.nextDate, this.dateFormat, this.language);
    return this.nextDate;
  }
  

  searchData(data){    
    this.service.getCampSearch(data.checkIn, data.checkOut, data?.capacity).subscribe((res) => {
      this.campList=res;
    }) 
  }
}
