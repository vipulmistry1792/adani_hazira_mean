import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-rangefilter',
  templateUrl: './rangefilter.component.html',
  styleUrls: ['./rangefilter.component.css']
})
export class RangefilterComponent  {
  @Input() name: string;
  constructor() { }

  ngOnInit(): void {
  }

}
