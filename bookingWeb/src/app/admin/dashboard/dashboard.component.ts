import { Component, OnInit } from '@angular/core';
import { CampService } from '../../service/camp.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private service : CampService) { }

  campList: any = [];
  Data: any = [];
  config: any;

  ngOnInit(): void {
    this.service.getCampListAdmin().subscribe((data) => {
      this.campList = data;
      console.warn(data);
      
      this.pagination();
    })
  }

  dataPass(data){
    this.Data = data;
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

}
