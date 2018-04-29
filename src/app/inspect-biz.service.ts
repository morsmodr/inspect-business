import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class InspectBizService {

  constructor(private http:HttpClient) { }

  getBiz() {
    return this.http.get('https://data.cityofchicago.org/resource/cwig-ma7x.json');
  }

}
