import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { Location } from 'src/app/models/location.model';
import { DataStoreService } from 'src/app/services/data-store.service';
import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map | L.LayerGroup<any>;
  private marker!: L.Marker<any>;
  // @Output() onClose = new EventEmitter();
  @Output() onSetMarker = new EventEmitter<number[]>();
  @Output() onEdit = new EventEmitter<number>();
  @Input() defaultLocation?: Location;
  @ViewChild('popup') popup?: ElementRef;


  currentPosition!: L.LatLng;

  popups: L.Marker[] = [];

  constructor(private ds: DataStoreService, 
              private injector: Injector, 
              private ps: PopupService) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    }).setView(this.defaultLocation?.location as L.LatLngExpression ?? [51.505, -0.09], 13);
    // if client didnt choose a location before, we set center of London city as our first location

    this.ds.allLocations.forEach((item:Location) => {
      let popupContent = this.ps.makeCustomPopup(item, this.popupEditClicked.bind(this));

      const popup = L.popup().setLatLng(item.location as L.LatLngExpression).setContent(popupContent);

      if (this.defaultLocation?.['id'] === item.id) {
        popup.openOn(this.map as L.Map);
      }

      const marker = L.marker(item.location as L.LatLngExpression).bindPopup(popup).addTo(this.map);

      this.popups.push(marker);
    });
    

    if ( !this.defaultLocation?.id ) this.marker = L.marker(this.defaultLocation?.location as L.LatLngExpression ?? [0, 0]).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.map.on('click', this.moveMarker.bind(this));

  }

  popupEditClicked(itemId: number) {
    this.onEdit.emit(itemId);    
    // this.onClose.emit();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  
  moveMarker(e: any) {
    this.currentPosition = e.latlng;
    if (this.defaultLocation?.id) {
      const foundIndex = this.ds.allLocations.findIndex((item:Location) => item.id === this.defaultLocation?.id)!;
      this.ds.allLocations[foundIndex].location = [e.latlng?.lat, e.latlng?.lng]; //should be better
      this.popups[foundIndex].setLatLng(e.latlng);

    } else {
      this.marker.setLatLng(e.latlng);
    }
  }

  closeButtonClicked() {
    // this.onClose.emit();
  }

  set() {
    if(this.currentPosition) 
      this.onSetMarker.emit([this.currentPosition.lat, this.currentPosition.lng]);
    
    // this.onClose.emit();
  }
}
