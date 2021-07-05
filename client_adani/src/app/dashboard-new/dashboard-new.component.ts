import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MqttDataService } from '../_services';
import { AlarmService } from '../_services';
@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public id ;
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public machine_data;
  constructor(
    private datepipe: DatePipe,
    private MqttData     : MqttDataService,
    private AlarmService : AlarmService,
    ) { }

  ngOnInit(): void {
    
  }
  getDataDiff(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }
showData()
{
  let start_date                   = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd HH:mm:ss');
  let end_date                     = this.datepipe.transform(this.dateValue1, 'yyyy-MM-dd HH:mm:ss');
  //console.log()
  this.machine_data=this.MqttData.mngodatewise(start_date,end_date);
  console.log(this.machine_data);
}
}
