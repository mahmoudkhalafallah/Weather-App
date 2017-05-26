import { Component } from '@angular/core';
import { NavParams, NavController, Events } from 'ionic-angular';
import { DataService } from '../../services/get-data.service'
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-locator',
  templateUrl: 'locator.html',
  providers: [DataService]
})
export class LocatorPage {
  locations: {}[] = [];
  constructor(private dataService : DataService, private events: Events, private storage: Storage, public navCtrl: NavController) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LocatorPage');
    this.getLocationsList();

    this.events.subscribe('locationObtained', (location) => {
      this.dataService.getCityData(location).subscribe(location => {
        this.storage.get('locations').then((locationsList:Map<'K','V'> ) => {
          locationsList = locationsList? locationsList: new Map();
          locationsList.set(location.results['0'].address_components['2']['long_name'],location.results['0'])
          this.storage.set('locations', locationsList).then(updatedLocations => {
            this.locations = Array.from(updatedLocations);
            console.log('new location added')
          });
        })
      })
    })
  }

  removeLocation(location) {
    this.storage.get('locations').then((locationsList:Map<'K','V'> ) => {
      locationsList = locationsList? locationsList: new Map();
      locationsList.delete(location['0'])
      this.storage.set('locations', locationsList).then(updatedLocations => {
        this.locations = Array.from(updatedLocations);
        console.log('a location removed')
      });
    })
  }

  trackLocation (index, location) {
    return location? location[0]: undefined;
  }

  goToWeatherDetails (locationDetails) {
    this.navCtrl.push(HomePage, locationDetails['1']);
  }

  getLocationsList () {
    this.storage.get('locations').then( locationsList => {
      this.locations = locationsList ? Array.from(locationsList): [];
      console.log(this.locations);
    })
  }

  delete (location) {
    // this.locations
    this.removeLocation(location);
    // let index = this.locations.indexOf(location);
    // this.locations.splice(index, 1);
    // console.log(location,this.locations )
  }


}
