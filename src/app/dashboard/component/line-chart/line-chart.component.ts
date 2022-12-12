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
  @Input() series: any;
  @Input() subtitle: any;
  @Input() data: any;

  constructor(public platform:Platform) {
  }

  ngOnInit() {
    console.log('LineChartComponent')
    console.log(this.data);
    this.chartConfig();
    this.drawChart();
  }

  chartConfig(){
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
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
        text: "Product Trends by Month",
        align: "center"
      },
      subtitle: {
        text: "Product Trends by Month",
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
        categories: [
          'Dec 2:42',
          'Dec 2:52',
          'Dec 3:10',
          'Dec 3:20',
          'Dec 3:30',
          'Dec 3:40',
          'Dec 3:50',
          'Dec 3:60',
          'Dec 3:70',
          'Dec 3:80',
          'Dec 3:90',
          'Dec 4:00',
        ]
      }
    };
  }


  drawChart() {
    setTimeout(() => {
      // this.chartOptions.series = this.series;
      this.chartOptions.series = [{
        name: "SIS090572-PV33",
        data: [0, 0, 35, 35, 35, 35, 0, 0, 0, 0],
      }];
      this.chartOptions.title = {text:this.title};
      this.chartOptions.subtitle = {text:this.subtitle};
    },1000)
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
