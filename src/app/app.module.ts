import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BurndownComponent } from './kpi/burndown/burndown.component';
import { DashComponent } from './pages/dash/dash.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PiechartComponent } from './kpi/piechart/piechart.component';

@NgModule({
  declarations: [
    AppComponent,
    BurndownComponent,
    DashComponent,
    NotfoundComponent,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
