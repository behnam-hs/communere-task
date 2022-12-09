import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
  locations?: Location[];
  currentPage = 1;
  totalPages = 1;
  perPage = 5;

  constructor(private ds: DataStoreService, 
              private route: ActivatedRoute, 
              private router: Router) {}
  
  ngOnInit(): void {
    this.totalPages = Math.ceil(this.ds.allLocations.length / this.perPage);
    this.route.queryParams.subscribe(params => {
      this.currentPage = Number(params?.['page']) || 1;
      this.navigateToPage(this.currentPage);
    });
  }

  navigateToPage(pageNumber: number) {
    this.router.navigate(['/locations'], {queryParams: {page: pageNumber}})
    this.locations = this.ds.paginate(pageNumber, this.perPage);
  } 

  next() {
    this.currentPage += 1;
    this.navigateToPage(this.currentPage);
  }

  prev() {
    this.currentPage -= 1;
    this.navigateToPage(this.currentPage);
  }

  removeLocation(id: number) {
    this.ds.delete(id);
    this.locations = this.ds.paginate(this.currentPage);
  }


}
