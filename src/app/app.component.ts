import { Component, NgZone, ViewChild, ElementRef, ChangeDetectorRef, ApplicationRef, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import { InspectBizService } from './inspect-biz.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inspect a Business';
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
          this.businesses = data;
          console.log(this.businesses);
        } else {
          console.log("Service call not made");
        }
      },
      err => console.error(err),
      () => console.log('done loading businesses')
    );
  }

ngAfterViewInit() {
  this.ngzone.runOutsideAngular( () => {
    this.keyUpSub = Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .debounceTime(1000)
      .subscribe((keyboardEvent) => {
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
      this.results = this.businesses.filter((obj) =>
        Object.keys(obj).some((key) => {
          if(typeof(obj[key]) === "string") {
            return obj[key].includes(inputValue);
          } else {
            return false;
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.keyUpSub.unsubscribe();
  }
}
