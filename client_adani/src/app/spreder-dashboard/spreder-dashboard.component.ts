import {  Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import Chart from 'chart.js';
import { first } from 'rxjs/operators';
import { MqttDataService } from '../_services';
import { AlarmService } from '../_services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts";
import { Subscription } from 'rxjs';
import { IndexService } from 'src/app/_services/index.service';
@Component({
  selector: 'app-spreder-dashboard',
  templateUrl: './spreder-dashboard.component.html',
  styleUrls: ['./spreder-dashboard.component.scss']
})
export class SprederDashboardComponent implements OnInit {
  subscription: Subscription 
  public datasets              : any;
  public lastdata              : any;
  public alarm_data            : any;
  public id;
  public count;
  public field                 = ['proxy-1']
  public alarm_datasummary     : [];
  public mqtt_lastdata         : any;
  public data                  : any;
  public salesChart;
  public clicked               : boolean = true;
  public clicked1              : boolean = false;
  public items;
  public sp_mode               = "Normal"
  public modebool              : Boolean = false;
  constructor(
    private http         : HttpClient,
    private MqttData     : MqttDataService,
    private AlarmService : AlarmService,

  ) { }
  fillColor = 'rgb(255, 255, 0)';
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
      //console.log(this.mqtt_lastdata.t_2)
    }, 1000);

    

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
change_mode()
{
  console.log(this.sp_mode)
  if(this.sp_mode == "Normal")
  {
    this.sp_mode="Twin"
    this.modebool=true;
  }
  else{
    this.sp_mode="Normal"
    this.modebool=false;
  }
}
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
