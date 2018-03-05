import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { FormControl } from '@angular/forms';
import { DetailPage } from '../detail/detail';
import 'rxjs/add/operator/debounceTime';

import { Geolocation } from '@ionic-native/geolocation'
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  concertList = [];
  test = [];
  loader = null;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;



  constructor(private dataService: DataServiceProvider, public loadingCtrl: LoadingController, private navCtrl: NavController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.searchControl = new FormControl();
    this.getUserLocation();
  }

  ionViewDidLoad() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();

    });


  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {

    this.concertList = this.dataService.filterItems(this.searchTerm);

  }

  ionViewWillEnter() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();


    this.dataService.load().subscribe((data: any) => {
      this.loader.dismiss()
      this.concertList = data;
      //console.log(this.concertList);

      //this.test = data.results;
      //console.log(this.test);

    }, error => console.error('Error: ' + error), () => console.log('finish! ActionsG'));
  }

  goToDetailPage(concert) {
    console.log(concert);
    this.navCtrl.push(DetailPage, {concert:concert});
  }

  getUserLocation() {
    console.log("get location");
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords);

      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
        .catch((error: any) => console.log(error));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  

}
