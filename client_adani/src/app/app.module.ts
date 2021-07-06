import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule ,FormGroup, FormControl} from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';
import {DatePipe} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SprederDashboardComponent } from './spreder-dashboard/spreder-dashboard.component';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component'; 
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker'; 
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    DataTablesModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    AuthLayoutComponent,
    DashboardComponent,
    SprederDashboardComponent,
    DashboardNewComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
    // provider used to create fake backend
    //fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
