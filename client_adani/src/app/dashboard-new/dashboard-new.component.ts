import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js';
import { first } from 'rxjs/operators';
import { MqttDataService } from '../_services';
import { AlarmService } from '../_services';
import { HttpClient } from '@angular/common/http';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts";

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
  public datasets                   : any;
  public data                       : any;
  public salesChart;
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public id ;
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public machine_data               = [];
  dtOptions                         : DataTables.Settings = {};
  objectKeys = Object.keys;
  graph_list = { 
                 t_1:  'Unlock Left Land Side', 
                 t_2:  'Unlock Left Water Side', 
                 t_3:  'Unlock Right Water Side',
                 t_4:  'Unlock Right Land Side',
                 t_5:  'Lock Left Land Side',
                 t_6:  'Lock Left Water Side',
                 t_7:  'Lock Right Water Side',
                 t_8:  'Lock Right Land Side',
                 t_9:  'Landed Left Land Side',
                 t_10: 'Landed Left Water Side',
                 t_11: 'Landed Right Water Side',
                 t_12: 'Landed Right Land Side',
                 t_17: 'Twin Unlock Left Land Side',
                 t_18: 'Twin Unlock Left Water Side',
                 t_19: 'Twin Unlock Right Water Side',
                 t_20: 'Twin Unlock Right Land Side',
                 t_21: 'Twin Lock Left Land Side',
                 t_22: 'Twin Lock Left Water Side',
                 t_23: 'Twin Lock Right Water Side', 
                 t_24: 'Twin Lock Right Land Side',
                 t_25: 'Twin Landed Left Land Side',
                 t_26: 'Twin Landed Left Water Side',
                 t_27: 'Twin Landed Right Water Side',
                 t_28: 'Twin Landed Right Land Side',
                 t_29: 'Twin Up Left Land side',
                 t_30: 'Twin Up Left Water side',
                 t_31: 'Twin Up Right Water side',
                 t_32: 'Twin Up Right Land side',
                 t_33: 'Hook Connected Left Side',
                 t_34: 'Hook Connected Right Side',
                 t_35: 'Hook DisConnected Left Side',
                 t_36: 'Hook DisConnected Right Side',
                 t_37: 'Twin Left Attached Position',
                 t_38: 'Twin Right Attached Position',
                 t_39: 'Twin in zero',
                 t_43: 'Twistlock Unlock Cmd',
                 t_44: 'Twistlock Lock Cmd',  
                 t_49: 'Twin Up Cmd',
                 t_50: 'Twin Dwn Cmd'                 
               }
  public prm_name ='t_1';
  public chartoption = {};
  public datalabels;
 public colors = ['#5793f3', '#d14a61', '#675bba','#6ab04c','#f9ca24'];
  constructor(
    private datepipe: DatePipe,
    private MqttData     : MqttDataService,
    private AlarmService : AlarmService,
    ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };  
  }
showData()
{
  this.machine_data = []; 
  this.datalabels   = []; 
  this.data         = []; 
  var fDate                     = this.dateValue.toISOString();
  var tDate                     = this.dateValue1.toISOString();
  this.MqttData.mngodatewise(fDate,tDate)    
  .pipe(first())
  .subscribe(mqttda => {
          this.machine_data = mqttda;
          for (let index = 0; index < this.machine_data.length; index++) {
           let row=this.machine_data[index];
           this.datalabels.push(this.datepipe.transform(this.machine_data[index].created, 'dd-MM-yy HH:mm:ss'));
           this.data.push(row[this.prm_name]);
          }
          var chartSales = document.getElementById('chart-sales');
          this.chartoption={
            type: 'line',
            scaleFontColor: 'white',
            options: {
              scales: {
                xAxes: [{ 
                  gridLines: {
                      display: false,
                  },
                  ticks: {
                    fontColor: "white", // this here
                  },
              }],
                yAxes: [{
                  gridLines: {
                    //zeroLineColor: colors.gray[900]
                  },
                  ticks: {
                    min:-1,
                    max: 2,
                    fontColor: "white", // this here
                  },
                  color: this.colors[1],
                }]
              }
            },
            data: {
              labels: this.datalabels,
              datasets: [{
                label:this.prm_name,
                data: this.data,
                borderColor: 'rgb(75, 192, 192)',
              }]
            }
          }
          this.salesChart = new Chart(chartSales,this.chartoption );
  });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
}
onParamChange($event)
{
  this.datalabels   = []; 
  this.data         = [];
  for (let index = 0; index < this.machine_data.length; index++) {
    let row=this.machine_data[index];
    this.datalabels.push(this.machine_data[index].created);
    this.data.push(row[this.prm_name]);
   }
   var chartSales = document.getElementById('chart-sales');
   this.chartoption={
     type: 'line',
     options: {
       scales: {
        xAxes: [{ 
          gridLines: {
              display: false,
          },
          ticks: {
            fontColor: "white", // this here
          },
      }],
         yAxes: [{
           gridLines: {
            // color: colors.gray[900],
             //zeroLineColor: colors.gray[900]
           },
           ticks: {
             min:-1,
             max: 2,
             fontColor: "white", // this here
           }
         }]
       }
     },
     data: {
       labels: this.datalabels,
       datasets: [{
         label:this.prm_name,
         data: this.data,
         borderColor: 'rgb(75, 192, 192)',
       }]
     }
   }
   this.salesChart = new Chart(chartSales,this.chartoption ); 
}

}
