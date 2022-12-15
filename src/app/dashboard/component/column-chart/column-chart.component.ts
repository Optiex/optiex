import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { WebSocketService } from 'src/app/web-socket.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: any;
  series: any = [];
  @Input() subtitle: any;
  @Input() data: any;

  constructor(public websocketService: WebSocketService) { }

  ngOnInit() {
    this.chartConfig();
    this.drawChart();
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
          // this.updateSocketData(data);
        // }
      });

      this.chartOptions.series = [{
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }];

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
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }

}
