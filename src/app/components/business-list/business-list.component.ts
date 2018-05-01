import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  @Input() public businessList;

  constructor(private _router: Router) {

  }

  ngOnInit() {

  }

  showDetailView(business) {
    localStorage.setItem('currentBusiness', JSON.stringify(business));
    this._router.navigate(['/detail', business.inspection_id]);
    setTimeout(() => {

    }, 2000);
  }
}
