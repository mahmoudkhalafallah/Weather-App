import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private weatherApi = 'https://api.darksky.net/forecast/3d760fcd77cc87231c81257a44e8706e/';  // URL to web API
  private locationApi = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';  // URL to web API

   constructor (private http: Http) {

   }

   getCityData (data) {
     return this.http.get(this.locationApi + data.lat + ',' + data.lng).map(res => res.json())
   }

   getWeatherData (data) {
     return this.http.get(this.weatherApi + data.lat + ',' + data.lng + '?units=si').map(res => res.json())
   }
}
