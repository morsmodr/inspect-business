import { Component, Input } from '@angular/core';

@Component({
  selector: 'business-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class BusinessListComponent {

  @Input() public businessList;

  constructor() { }

  ngOnInit() {

  }
}
