import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  @Input() public businessList;

  constructor() { }

  ngOnInit() {

  }

  showDetailView(business) {

  }
}
