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
import { QueryBuilderModule } from "angular2-query-builder";
// used to create fake backend
//import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';
import {DatePipe} from '@angular/common';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component';  
import { NgxDatetimeRangePickerModule } from 'ngx-datetime-range-picker';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxBootstrapDatepickerComponent } from './ngx-bootstrap-datepicker/ngx-bootstrap-datepicker.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    QueryBuilderModule,
    NgxDatetimeRangePickerModule.forRoot(),
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule, 
    MatIconModule,
    MatSelectModule,
    ModalModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    AuthLayoutComponent,
    DashboardNewComponent,
    NgxBootstrapDatepickerComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,BsModalService
    // provider used to create fake backend
    //fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
