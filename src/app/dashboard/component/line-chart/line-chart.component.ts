import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexLegend
} from "ng-apexcharts";
import { WebSocketService } from 'src/app/web-socket.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
};

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit,OnChanges {

  @ViewChild("chart",{static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: any;
  series: any = [];
  @Input() subtitle: any;
  @Input() data: any;

  constructor(public platform:Platform, public websocketService: WebSocketService) {
  }

  ngOnInit() {
    console.log('LineChartComponent')
    // console.log(this.data);
    this.data.chart_details.sensor.forEach((element:any) => {
      this.series.push({name: element.uuid, data:[]});
      console.log(this.series);
    });
    this.chartConfig();
    this.drawChart();
  }

  chartConfig(){
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: "",
        align: "center"
      },
      subtitle: {
        text: "",
        align: "center"
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: true,
        // offsetY: -25,
        // offsetX: -5
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'datetime'
      }
    };
  }


  drawChart() {
    setTimeout(() => {

      // let data = [{ x: '05/06/2014', y: 54 }, { x: '05/08/2014', y: 17 }];
      // this.series.push({'name':'SIS090572-PV33','data':data});

      // this.chartOptions.series = this.series;
      // console.log(this.chartOptions.series)
      this.chartOptions.title = {text:this.title};
      this.chartOptions.subtitle = {text:this.subtitle};

      this.websocketService.sensorData.subscribe(data => {
        // if (this.ageType == 'live') { // live graph check
          this.updateSocketData(data);
        // }
      });

    },1000)
  }

  updateSocketData(data:any) {
    for (let key in data) {
      for (let i = 0; i < this.series.length; i++) {
        if (this.series[i]['name'] == key) {
          let obj = {
            y: data[key][0]['value'],
            x: this.convertUTCDateToLocalDate(data[key][0]['timestamp']).getTime(),
            parameters: data[key][0]['parameters']
          }
          this.series[i].data = this.series[i].data.concat([obj]);
          // console.log(this.series[i].data);
        }
      }
    }
    this.chartOptions.series = this.series;
    // console.log(this.chartOptions.series);
    this.chart.updateSeries(this.series);

  }

  ngOnChanges(){
    console.log(this.chart);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  convertUTCDateToLocalDate(date:any) {
    var newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate;
  }

  isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;
  }

}
