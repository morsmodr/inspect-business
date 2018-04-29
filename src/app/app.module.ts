import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InspectBizService } from './inspect-biz.service';

import { AppComponent } from './app.component';
import { BusinessListComponent } from './components/businessList/component';


@NgModule({
  declarations: [
    AppComponent,
    BusinessListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [InspectBizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
