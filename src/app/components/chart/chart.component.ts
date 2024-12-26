import { Component, OnInit, NgZone, Input } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit{


  @Input() chartData:any


  chart: any = null;
  constructor(
    private zone: NgZone
    ) { }

  ngOnInit(): void {
   
  }



  

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart:any = am4core.create('chartDiv', am4charts.XYChart);
      chart.data=this.chartData;
  
  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 1;
  dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";
  dateAxis.renderer.minGridDistance = 4;
  dateAxis.tooltipDateFormat = "MMM dd, yyyy";
  dateAxis.dateFormats.setKey("day", "dd");
  
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  
  
  // Create series
  let series = chart.series.push(new am4charts.LineSeries());
  series.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.strokeDasharray = 3;
  series.strokeWidth = 2
  series.strokeOpacity = 0.3;
  series.strokeDasharray = "3,3"
  
  let bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.strokeWidth = 2;
  bullet.stroke = am4core.color("#fff");
  bullet.setStateOnChildren = true;
  bullet.propertyFields.fillOpacity = "opacity";
  bullet.propertyFields.strokeOpacity = "opacity";
  
  let hoverState = bullet.states.create("hover");
  hoverState.properties.scale = 10;
  
  function createTrendLine(data:any) {
    let trend = chart.series.push(new am4charts.LineSeries());
    trend.dataFields.valueY = "value";
    trend.dataFields.dateX = "date";
    trend.strokeWidth = 2
    trend.stroke = trend.fill = am4core.color("#c00");
    trend.data = data;
  
    let bullet = trend.bullets.push(new am4charts.CircleBullet());
    bullet.tooltipText = "{date}\n[bold font-size: 17px]value: {valueY}[/]";
    bullet.strokeWidth = 2;
    bullet.stroke = am4core.color("#fff")
    bullet.circle.fill = trend.stroke;
  
    let hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 1.7;
  
    return trend;
  };
  
  // createTrendLine([
  //   { "date": "2012-01-02", "value": 1 },
  //   { "date": "2012-01-11", "value": 19 }
  // ]);
  
  // let lastTrend = createTrendLine([
  //   { "date": "2012-01-17", "value": 1 },
  //   { "date": "2012-01-22", "value": 10 }
  // ]);
  
  // // Initial zoom once chart is ready
  // lastTrend.events.once("datavalidated", function(){
  //   series.xAxis.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
  // });

      
      

     
      this.chart = chart
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart !== null) {
        this.chart.dispose();
      }
    });
  }

}
