import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  concert: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (!this.navParams.get('concert')) {
      console.log("concert data not exists");
    } else {
      this.concert = this.navParams.get('concert');

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
