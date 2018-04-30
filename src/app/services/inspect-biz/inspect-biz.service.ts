import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

@Injectable()
export class InspectBizService {

  api_root = 'https://data.cityofchicago.org/resource/cwig-ma7x.json';

  public data: any;

  public businessList;

  constructor(private http:HttpClient) { }

  getList() {
    return this.http.get(this.api_root).subscribe((data) => {
      this.businessList = data;
      console.log(this.businessList);
      return this.businessList;
    });
  }

  getDetail(id) {
    return of(this.businessList.filter((obj) => obj.inspection_id === id));
  }

}
