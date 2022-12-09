import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Location } from './../models/location.model';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  allLocations: Location[] = [];
  lastItemId = 0;

  constructor() { 
    if (localStorage.getItem('Locations')) {
      this.allLocations = JSON.parse(localStorage.getItem('Locations')!);
      this.lastItemId = this.allLocations[this.allLocations.length - 1].id;
    }
  }

  paginate(page = 1, perPage = 5) {
    return this.allLocations.slice((page - 1) * perPage, page * perPage)
  }

  create(location: Omit<Location, 'id'>) {
    this.lastItemId += 1;
    this.allLocations.unshift({ 
      id: this.lastItemId, 
      ...location 
    });

    this.saveToLocalStorage();
  }

  update(location: Omit<Location, 'id'>, itemId: number) {
    let foundItemRef = this.allLocations.find(item => item.id === itemId)!;
  
    foundItemRef.name = location.name;
    foundItemRef.location = location.location;
    foundItemRef.type = location.type;
    foundItemRef.image = location.image;

    this.saveToLocalStorage();
  }

  delete(id: number) {
    const fountIndex = this.allLocations.findIndex((item) => item.id === id)
    this.allLocations.splice(fountIndex, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('Locations', JSON.stringify(this.allLocations));
  }

}
