import { Component, NgZone, ViewChild, ElementRef, ChangeDetectorRef, ApplicationRef, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inspect a Business';
  public businesses;
  public results;
  keyUpSub: Subscription;

  @ViewChild('input') searchInput: ElementRef;

  constructor(private inspectBiz: SearchService, private ngzone: NgZone,
    private cdref: ChangeDetectorRef, private appref: ApplicationRef) { }

  ngOnInit() {
    //this.results =
    // this.inspectBiz.search().subscribe(
    //   data => {
    //     if(this.businesses != null) {
    //       this.businesses = data;
    //       console.log(this.businesses);
    //     } else {
    //       console.log("Service call not made");
    //     }
    //   },
    //   err => console.error(err),
    //   () => console.log('done loading businesses')
    // );
  }

ngAfterViewInit() {
  this.ngzone.runOutsideAngular( () => {
    this.keyUpSub = Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .debounceTime(1000)
      .subscribe((keyboardEvent) => {
      //  this.results = 
        //this.inspectBiz.search(keyboardEvent['target'].value);
        console.log(keyboardEvent);
        console.log(this.businesses);
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
      this.results = this.businesses.filter((business) => {
        Object.keys(business).some(function(key) {
          return business[key].includes(inputValue);
        });
      });
    }
  }

  ngOnDestroy() {
    this.keyUpSub.unsubscribe();
  }
}
