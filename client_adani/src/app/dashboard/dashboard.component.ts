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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selected                     : any;
  modalRef                     : BsModalRef;
  subscription                 : Subscription 
  public datasets              : any;
  public lastdata              : any;
  public lastdata1             : any;
  public alarm_data            : any;
  public id;
  public count;
  public field                 =['proxy-1']
  public alarm_datasummary     : [];
  public alarm_datasummary1    : any;
  public mqtt_lastdata         : any;
  public data                  : any;
  public salesChart;
  public clicked               : boolean = true;
  public clicked1              : boolean = false;
  public items;
  public t_1                   = [];
  chart;
  chartOptions                 : {};
  public dates_array           = [];
  highcharts
  tzone                        = "UTC";
  query: string = 'Today';
  prm  : String = 'All';
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
    // private route: ActivatedRoute,
    private http         : HttpClient,
    private MqttData     : MqttDataService,
    private AlarmService : AlarmService,
    private modalService: BsModalService,
   
  ) { 
    this.alwaysShowCalendars = true;
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    //this.chartOptions_cmp1                  = {};
   // this.chartOptions_cmp2                  = {};
 }
  ngOnInit(): void {
    this.items = this.MqttData.getAll();
    this.httpRequest();
    this.httpRequest_alaram();
    this.httpRequest_alarmsummary();
     this.httpRequest_mongo();
    this.id =setInterval (()=> {
      this.httpRequest();
       this.httpRequest_mongo();
      this.httpRequest_alaram();
      this.httpRequest_alarmsummary();
      this.lastdata1 = this.mqtt_lastdata;
      delete this.lastdata1['created'];
      delete this.lastdata1['id'];
      this.lastdata1['All'] ="All";
    //  console.log(this.selected)
    }, 10000);
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

  }
  httpRequest() {
    this.MqttData.getAll()
    .pipe(first())
    .subscribe(users => this.lastdata = users.data[0]);
  }
  httpRequest_mongo() {
    this.MqttData.getAllmngo()
    .pipe(first())
    .subscribe(MqttDatas => this.mqtt_lastdata = MqttDatas[0]);
  }
  httpRequest_alaram() {
    this.AlarmService.getAll()
    .pipe(first())
    .subscribe(alarm_data => this.alarm_data = alarm_data.data);
  }
  httpRequest_alarmsummary() {
    this.AlarmService.getAllalarmsummary()
    .pipe(first())
    .subscribe(alarm_data => this.alarm_datasummary = alarm_data.data);
   

  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  deletealarm(id) {
    let myDate = new Date(); 
    //console.log(myDate);
    this.AlarmService.delete(id)
        .pipe(first())
        .subscribe(() =>  this.httpRequest_alaram());
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
 this.dates_array=[];
 this.t_1=[];
 let val = this.prm;
 for (let index = 0; index < lengthofdates; index++) {
  var date = new Date(this.alarm_datasummary1[index].created);
  date.toISOString(); // "2017-04-29T09:54:28.714Z"
  date.toLocaleTimeString(); //"Sat, 29 Apr 2017 09:54:28 GMT"
  this.dates_array.push(this.alarm_datasummary1[index].created);
//  const result = this.alarm_datasummary1.map((val)=>({}))
//  console.log(result)
  //this.t_1.push(this.alarm_datasummary1[index].val)
 }

//  this.highcharts     = Highcharts;
//         this.chartOptions = {
//           chart: {
//             zoomType: 'x',
//             },
//           credits: { enabled: false },
//           legend: {
//             style: {
//             },
//             itemStyle: {
//             },
//           },
//           title: {
//             text: 'Data',
//             style: {
//               fontSize: 15
//             }
//           },
//           xAxis: {
//             categories: this.dates_array,
//             labels: {
//               style: {
//               }
//             }
//           },
//           tooltip: {
//             shared: true
//         },     
//         yAxis: [
//             {
//               lineWidth: 1,
//               opposite: true,
//               title: {
//                   text: this.prm,
//               },
//               labels: {
//                 style: {
//                   fontSize: 10
//                 }
//               },
//         },
//         ],
//         labels: {
//             items: [{
//                 html: '',
//                 style: {
//                   fontSize: 15
//                 }
//             }]
//         },
//         series: [
//           {
//             type: 'spline',
//             name: this.prm,
//             data: this.t_1,
//             yAxis: 1,
//             tooltip: {
//               valueSuffix: ' '
//             }
//           }
//         ]
//         };
//  delete this.alarm_datasummary1['created'];
//  delete this.alarm_datasummary1['id'];
}
httpRequest_datafromto(fromDate,toDate) {
  this.MqttData.mngodatewise(fromDate,toDate)
  .pipe(first())
  .subscribe(alarm_data => this.alarm_datasummary1=alarm_data);
 

}

}


