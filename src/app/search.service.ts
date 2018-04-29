import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SearchService {

  public businesses;

  constructor(private http:HttpClient) { }

  search(term: string) {
    if(this.businesses.length == 0) {
        this.http.get('https://data.cityofchicago.org/resource/cwig-ma7x.json')
          .subscribe(
            data => this.businesses = data,
            err => console.log("Error Loading"),
            () => console.log("Done loading"));
    }

    return this.businesses.filter((business) => {
      Object.keys(business).some(function(key) {
        return business[key].includes(term);
      });
    });
  }

}
