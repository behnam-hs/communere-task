import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import * as L from 'leaflet';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private ds: DataStoreService) { }

  makeCustomPopup(location: Location, callBackFn: any) {
    
        const popupWrapper = document.createElement('div');
        popupWrapper.className = 'popup-wrapper';
        
        const popupHeader = document.createElement('h6');
        popupHeader.textContent = location.name;
        popupHeader.className = 'popup-header'
        
        const popupDetails = document.createElement('div');
        const popupDetail1 = document.createElement('span');
        const popupDetail2 = document.createElement('span');
        popupDetails.className = 'popup-details'
        popupDetail1.textContent = `Type: ${location.type}`;
        popupDetail2.textContent = `LatLng: ${location.location[0].toFixed(3)}, ${location.location[1].toFixed(3)}`;
        popupDetails.append(popupDetail1, popupDetail2);
        
        const popupEditButton = document.createElement('a');
        popupEditButton.className = 'popup-button';
        // if(  ) we were in EditMode we should change the buttons text
        popupEditButton.textContent = 'Edit';
        popupEditButton.className = 'popup-button btn';
        popupEditButton.addEventListener('click', () => callBackFn(location.id), false);
        
        popupWrapper.append(popupHeader, popupDetails, popupEditButton);
    
        // L.marker(item.location as L.LatLngExpression).addTo(this.map);

        return popupWrapper;
      };
}
