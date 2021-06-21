import { Component, OnInit, TemplateRef } from '@angular/core';
import Chart from 'chart.js';
import { first } from 'rxjs/operators';
import { MqttDataService } from '../../_services';
import { AlarmService } from '../../_services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Subscription } from 'rxjs';
import { IndexService } from 'src/app/_services/index.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modalRef                     : BsModalRef;
  subscription                 : Subscription 
  public datasets              : any;
  public lastdata              : any;
  public alarm_data            : any;
  public id;
  public count;
  public field                 =['proxy-1']
  public alarm_datasummary            : [];
  public mqtt_lastdata         : any;
  public data                  : any;
  public salesChart;
  public clicked               : boolean = true;
  public clicked1              : boolean = false;
  public items;
  public chartoption           :{};
// Colors
public colors = {
  gray: {
    100: '#f6f9fc',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529'
  },
  theme: {
    'default': '#172b4d',
    'primary': '#5e72e4',
    'secondary': '#f4f5f7',
    'info': '#11cdef',
    'success': '#2dce89',
    'danger': '#f5365c',
    'warning': '#fb6340'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent',
};
  constructor(
   // private route: ActivatedRoute,
    private http         : HttpClient,
    private MqttData     : MqttDataService,
    private AlarmService : AlarmService,
    private modalService: BsModalService
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    //this.chartOptions_cmp1                  = {};
   // this.chartOptions_cmp2                  = {};
 }
  ngOnInit() {
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
 
    }, 10000);
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];
    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
    this.chartoption = {
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              color: this.colors.gray[900],
              zeroLineColor: this.colors.gray[900]
            },
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  return '$' + value + 'k';
                }
              }
            }
          }]
        }
      },
      data: {
        labels: ['Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Performance',
          data: [50,0, 20, 10, 30, 15, 40, 20, 60, 60]
        }]
      }
    }
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
    console.log(myDate);
   
    this.AlarmService.delete(id)
        .pipe(first())
        .subscribe(() =>  this.httpRequest_alaram());
}
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
