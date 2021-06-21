import { Component, OnInit, TemplateRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { MqttDataService } from '../_services';
import { AlarmService } from '../_services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QueryBuilderConfig } from 'angular2-query-builder';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts";
import { Subscription } from 'rxjs';
import { IndexService } from '../_services/index.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment'

import * as dayjs from "dayjs";
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
  selected                     : any;
  subscription                 : Subscription
  modalRef                     : BsModalRef; 
  public datasets              : any;
  public lastdata              : any;
  public alarm_data            : any;
  public id;
  public count;
  public field                 = []
  public alarm_datasummary     : [];
  public alarm_datasummary1    : [];
  public statusdata            : [];
  public mqtt_lastdata         : any;
  public data                  : any;
  public salesChart;
  public clicked               : boolean = true;
  public clicked1              : boolean = false;
  public items;
  prm                          : String = 'All';
  public t_1                   = [];
  chart;
  chartOptions                 : {};
  public dates_array           = [];
  alwaysShowCalendars: boolean;
  timepicker:true;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  constructor(
    private http         : HttpClient,
    private MqttData     : MqttDataService,
    private AlarmService : AlarmService,
    private modalService: BsModalService,  
  ) { 
    this.alwaysShowCalendars = true;   
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    //this.chartOptions_cmp1                  = {};
   // this.chartOptions_cmp2                  = {};
 }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  } 
  ngOnInit(): void {
    this.id =setInterval (()=> {
       this.httpRequest_mongo();}, 10000);
  }
  httpRequest_mongo() {
    this.MqttData.mngogetAll()
    .pipe(first())
    .subscribe(MqttDatas => this.mqtt_lastdata = MqttDatas);
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  show()
  {
   this.httpRequest_datafromto(this.selected.startDate.$d,this.selected.endDate.$d);
   let lengthofdates = this.alarm_datasummary1.length - 1;
   for (let index = 0; index < lengthofdates; index++) {
    this.dates_array.push(this.alarm_datasummary1[index]);
    if(this.statusdata.length<=0)
    {
      this.statusdata.push(this.alarm_datasummary1[index])
    }
    else
    {
      let lastindex=this.statusdata.length;
      let laststatus= this.statusdata.findIndex[lastindex];
      console.log(laststatus);
    }
   }
  
  
  }
  httpRequest_datafromto(fromDate,toDate) {
    this.MqttData.mngodatewise(fromDate,toDate)
    .pipe(first())
    .subscribe(alarm_data => this.alarm_datasummary1=alarm_data);
  }
}
