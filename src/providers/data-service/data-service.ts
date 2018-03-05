import { Injectable } from '@angular/core';

import { HttpProvider } from '../http/http';
//import { HttpAngularProvider } from '../http-angular/http-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  data: any;
  http: any;

  concertApiUrl: string = "http://findconcertwebapp.azurewebsites.net/api";

  constructor(public httpProvider: HttpProvider) {
    console.log('Hello DataServiceProvider Provider');
    this.http = httpProvider;

  }


  load(): any {

    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.concertApiUrl + '/Concerts' ).map(this.processConcertData, this);
    }

    
  }

  filterItems(searchTerm){
    if (this.data) {
      return this.data.filter((item) => {

        if (item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
          return true;

        if (item.ConcertPerformers) {
          for (let concertPerformers of item.ConcertPerformers) {
            if (concertPerformers.Role.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
              return true;
            if (concertPerformers.Performer) {
              if (concertPerformers.Performer.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                return true;
            }
          }
        }

        if (item.ConcertDates) {
          for (let ConcertDate of item.ConcertDates) {
            if (ConcertDate.Venue) {
              if (ConcertDate.Venue.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                return true;
              if (ConcertDate.Venue.City.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                return true;
              if (ConcertDate.Venue.Country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                return true;
              if (ConcertDate.Venue.Location.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                return true;
            }
          }
        }

      });
    }
    return [];
  }


  getListOfVenues() {
    let venues = [];

    if (this.data) {
      for (let item of this.data) {
        if (item.ConcertDates) {
          for (let ConcertDate of item.ConcertDates) {
            if (ConcertDate.Venue) {
              let venueExists = false;
              for (let v of venues) {
                if (v.Name) {
                  if (v.Name == ConcertDate.Venue.Name) {
                    venueExists = true;
                    break;
                  }
                }
              }
              if (!venueExists) {
                venues.push(ConcertDate.Venue);
              }
            }
          }
        }
      }
    }

    return venues;
  }

  getListOfPerformers() {

  }

  getListOfOrchestras() {

  }
    //return this.http.get("https://randomuser.me/api/");

    //if (this.data) {
    //  return Observable.of(this.data);
    //} else {
    //  console.log("load");
    //  return this.http.get(this.concertApiUrl + '/Concerts', {}, {})
    //    .then(data => {

    //      console.log(data.status);
    //      console.log(data.data); // data received by server
    //      console.log(data.headers);

    //    })
    //    .catch(error => {

    //      console.log(error.status);
    //      console.log(error.error); // error message as string
    //      console.log(error.headers);

    //    });
    //}



 

  processConcertData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();
    return this.data;
  }


}
