import { Component } from '@angular/core';
import { getLocationService } from '../../services/get-location.service'
import { Events } from 'ionic-angular'

@Component({
  selector: 'get-location',
  templateUrl: 'get-location.html',
  providers: [getLocationService]
})
export class GetLocationComponent {

  text: string;

  constructor(private _locationService:getLocationService, private events: Events) {
    console.log('Hello GetLocationComponent Component');
    this.text = 'Hello World';
  }

  getLocation() {
    // ;
    this._locationService.getCurrentLocation()
    .then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      let cords = {
        'lat' : resp.coords.latitude,
        'lng' : resp.coords.longitude
      }
      this.events.publish('locationObtained', cords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
