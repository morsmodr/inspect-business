import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  @Input() public businessList;

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  showDetailView(business) {
    localStorage.setItem('currentBusiness', JSON.stringify(business));
    setTimeout(() => {
      this._router.navigate(['/detail', business.inspection_id]);
    }, 1000);
  }
}
