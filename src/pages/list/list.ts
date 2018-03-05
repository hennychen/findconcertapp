import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  venues = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataServiceProvider) {
  }

  itemTapped(event, item) {
    
  }
  ionViewDidLoad() {
    this.venues = this.dataService.getListOfVenues();
    console.log('ionViewDidLoad VenuesPage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter VenuesPage');
  }

  getConcertsByVenue() {
    console.log("test");
  }
}
