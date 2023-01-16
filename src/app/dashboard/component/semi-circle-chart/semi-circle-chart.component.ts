import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { WebSocketService } from 'src/app/web-socket.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};
@Component({
  selector: 'app-semi-circle-chart',
  templateUrl: './semi-circle-chart.component.html',
  styleUrls: ['./semi-circle-chart.component.scss'],
})
export class SemiCircleChartComponent implements OnInit {

  @ViewChild("chartDiv",{static: false}) chartDiv: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: any;
  @Input() chart: any;
  series: any = [];
  @Input() subtitle: any;
  @Input() data: any;

  constructor(public websocketService: WebSocketService) { }

  ngOnInit() {
    this.chartConfig();
    this.drawChart();
  }

  drawChart(){
    setTimeout(() => {
      this.chartOptions.title = {text:this.title};
      this.chartOptions.subtitle = {text:this.subtitle};
      this.websocketService.sensorData.subscribe(data => {
        // if (this.ageType == 'live') { // live graph check
          // this.updateSocketData(data);
        // }
        this.chartOptions.series = [80];
      });
    },1000);
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

  convertUTCDateToLocalDate(date:any) {
    var newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate;
  }

  isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;
  }

  chartConfig(){
    this.chartOptions = {
      series: [],
      chart: {
        type: "radialBar",
        offsetY: -20
      },
      title: {text:'testing'},
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: "22px"
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        }
      },
      labels: ["Average Results","testings"]
    };
  }

}
