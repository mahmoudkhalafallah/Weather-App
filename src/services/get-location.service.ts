import { Injectable } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class getLocationService {
   constructor (private geolocation: Geolocation) {

   }

   getCurrentLocation () {
     return this.geolocation.getCurrentPosition()
   }
}
