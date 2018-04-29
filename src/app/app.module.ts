import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InspectBizService } from './inspect-biz.service';

import { AppComponent } from './app.component';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { BusinessDetailComponent } from './components/business-detail/business-detail.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    BusinessListComponent,
    BusinessDetailComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [InspectBizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
