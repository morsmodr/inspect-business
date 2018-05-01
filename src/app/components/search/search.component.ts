import { Component, NgZone, ViewChild, ElementRef,
  ChangeDetectorRef, ApplicationRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import { InspectBizService } from '../../inspect-biz.service';
import { Subscription } from 'rxjs/Subscription';
import { PropertyList } from '../../property-list';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public businesses = [];
  public results = [];
  keyUpSub: Subscription;

  @ViewChild('input') searchInput: ElementRef;

  constructor(private _inspectBizService: InspectBizService, private ngzone: NgZone,
    private cdref: ChangeDetectorRef, private appref: ApplicationRef) { }

    ngOnInit() {
      this._inspectBizService.getBiz().subscribe(
        (data: any[]) => {
          if(this.businesses != null) {
            this.businesses = this.processData(data);
          }
        },
        err => console.error(err),
        () => console.log('done loading businesses')
      );
      let cachedResults = JSON.parse(localStorage.getItem('searchResults'));
      if(cachedResults && cachedResults.length != 0) {
        this.results = cachedResults;
      }
    }

  processData(data) {
    return data.map((obj) => {

      if(typeof(obj.violations) != "undefined"){

        let violationsList = obj.violations.split('|').map((violation) => {

          if(typeof(violation) != "undefined"){
            let violationObject = violation.split("Comments:");
            return {
              violationName: violationObject[0] ? violationObject[0] : undefined,
              violationComment: violationObject[1] ? violationObject[1] : undefined
            }
          } else {
            return null;
          }
        });
        return Object.assign({}, obj, { violationsList: violationsList });

      } else {
        return Object.assign({}, obj, { violationsList: null });;
      }
    });
  }

  ngAfterViewInit() {
    if(this.results.length != 0) {
      let cachedSearchTerm = localStorage.getItem('searchTerm');
      if(cachedSearchTerm && cachedSearchTerm.length != 0) {
        this.searchInput.nativeElement.value = cachedSearchTerm;
      }
    }

    this.ngzone.runOutsideAngular( () => {
      this.keyUpSub = Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent) => {
          this.search(keyboardEvent);
          this.cdref.detectChanges();
        });
      });
    }

    search(keyboardEvent) {
      let inputValue = keyboardEvent.target.value;
      if(inputValue.length === 0) {
        this.results = [];
      } else {
        this.results = this.businesses
          .filter((obj) =>
            PropertyList.some((key) => {
              if(typeof(obj[key]) === "string") {
                return obj[key].toLowerCase().includes(inputValue.toLowerCase());
              } else {
                return false;
              }
            })
          );
        }
        localStorage.setItem('searchResults', JSON.stringify(this.results));
        localStorage.setItem('searchTerm', inputValue);
    }

}
