import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { HomeNequiComponent } from './components/nequi/home/homeNequi.component';
import { UserComponent } from './components/nequi/user/user.component';
import { FeeComponent } from './components/nequi/fee/fee.component';
import { LoanComponent } from './components/nequi/loan/loan.component';
import { SummaryComponent } from './components/nequi/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HomeComponent,
    HomeNequiComponent,
    UserComponent,
    FeeComponent,
    LoanComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
