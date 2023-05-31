import { Component, OnInit } from '@angular/core';
import { CampService } from '../../service/camp.service'

@Component({
  selector: 'app-manage-camp',
  templateUrl: './manage-camp.component.html',
  styleUrls: ['./manage-camp.component.css']
})
export class ManageCampComponent implements OnInit {

  campList: any = [];
  config: any;

  constructor( private service : CampService) { }

  ngOnInit(): void {
    this.service.getCampListAdmin().subscribe((data) => {
      this.campList = data;
      this.pagination();
    })
  }

  deleteCamp(id){
    this.service.deleteCamp(id).subscribe()
    alert('Delete Successfully')
    window.location.reload();
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
