import { Component, OnInit, Input } from '@angular/core';

declare var google;

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  @Input() public businessInfo;

  constructor() { }

  ngOnInit() {
    this.businessInfo = JSON.parse(localStorage.getItem('currentBusiness'));
    this.initMap();
  }

  initMap() {
    let location = {
      lat: this.businessInfo.location.coordinates[1],
      lng: this.businessInfo.location.coordinates[0]
    };

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location
    });

    let marker = new google.maps.Marker({
      position: location,
      map: map
    })
  }

}
