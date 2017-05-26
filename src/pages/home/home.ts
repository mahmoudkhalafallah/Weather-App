import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/get-data.service'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataService]
})
export class HomePage {
  timing;
  locationDetails;
  weatherData;
  currentTime;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService :DataService) {

  }

  ngOnInit () {
    this.timing = 'hourly';
    this.locationDetails = this.navParams.data;
    this.dataService.getWeatherData(this.locationDetails.geometry.location).subscribe(weatherData => {
      this.weatherData = weatherData;
    })
  }

}
