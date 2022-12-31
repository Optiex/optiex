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
  ApexLegend,
  ApexTooltip,
  ApexYAxis
} from "ng-apexcharts";
import { WebSocketService } from 'src/app/web-socket.service';
import { SensorService } from '../../sensors/sensor.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  legend: ApexLegend;
  tooltip: ApexTooltip;
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
  ageType:string = 'live';
  sensorsUUID:any = [];
  dataLimit = 20;

  constructor(public platform:Platform,
    public websocketService: WebSocketService,
    public sensorService: SensorService) {
  }

  ngOnInit() {
    console.log('LineChartComponent')
    // console.log(this.title);
    this.data.chart_details.sensor.forEach((element:any,index:any) => {
      this.sensorsUUID.push(element.uuid);
      this.series.push({name: element.uuid, data:[]});
      console.log(this.series);
    });
    this.chartConfig();
    this.drawChart();
  }

  chartConfig(){
    this.chartOptions = {
      series: [],
      // toolbar: {
      //   show: false
      // },
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
        align: "center",
        style: {
          fontSize: '25px',
          // fontFamily?: string;
          // fontWeight?: string | number;
          // color?: string;
        }
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
          colors: ["transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'abc'
        }
      }
    };
  }


  drawChart() {
    setTimeout(() => {

      // let data = [{ x: '05/06/2014', y: 54 }, { x: '05/08/2014', y: 17 }];
      // this.series.push({'name':'SIS090572-PV33','data':data});

      // this.chartOptions.series = this.series;
      // console.log(this.chartOptions.series)
      this.getSensorDataByAgeing('live');
      this.chartOptions.title = {
        text:this.title,
        align: "left",
        style: {
          fontSize: '20px'
        }
      };
      this.chartOptions.subtitle = {
        text:this.subtitle,
        align: "left",
        style: {
          fontSize: '14px'
        }
      };

      this.websocketService.sensorData.subscribe(data => {
        if (this.ageType == 'live') { // live graph check
          this.updateSocketData(data);
        }
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
    console.log(this.series);
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

  getSensorDataByAgeing(ageType:string) {
    this.ageType = ageType;
    let data:any = {
      codes: this.sensorsUUID,
      limit: 100000
    }
    if (ageType == "hour") {
      var todayDate = new Date();
      data["end_date"] = todayDate.getTime();
      todayDate.setHours(todayDate.getHours() - 1);
      data["start_date"] = todayDate.getTime();
    } else if (ageType == "live") {
      data['limit'] = this.dataLimit;
    } else if (ageType == "day") {
      var todayDate = new Date();
      data["end_date"] = todayDate.getTime();
      todayDate.setDate(todayDate.getDate() - 1);
      data["start_date"] = todayDate.getTime();
    } else if (ageType == "week") {
      var todayDate = new Date();
      data["end_date"] = todayDate.getTime();
      todayDate.setDate(todayDate.getDate() - 7);
      data["start_date"] = todayDate.getTime();
    } else if (ageType == "month") {
      var todayDate = new Date();
      data["end_date"] = todayDate.getTime();
      todayDate.setDate(todayDate.getDate() - 30);
      data["start_date"] = todayDate.getTime();
    } else if (ageType == "halfYear") {
      var todayDate = new Date();
      data["end_date"] = todayDate.getTime();
      todayDate.setDate(todayDate.getDate() - 182);
      data["start_date"] = todayDate.getTime();
    }
    this.chartOptions.series = [];
    this.sensorService.getSensorsData(data).subscribe((resp: any) => {
      for (let i = 0; i < this.sensorsUUID.length; i++) {
        var key = this.sensorsUUID[i];
        this.chartOptions.series = this.getGraphDataArray(resp[key],key);
      }
    });

  }

  getGraphDataArray(data:any, key:any, isNotify?:any) {
    var sensorData = [];
    if (!this.isNullOrUndefined(data)) {
      let lst = [];
      for (var i = data.length; i--;) {
        if (!this.isNullOrUndefined(data[i]["alert"]) &&
         data[i]["alert"]["status"] && data[i]["alert"]["alert_type"] != 'error_code') {

          var marker = {
            fillColor: "red",
            lineWidth: 3,
            lineColor: "#FF0000",
            states: {
              hover: {
                fillColor: "red",
                lineColor: "red"
              }
            }
          };
          let obj = {
            y: data[i]["value"].toFixed(4),
            x: this.convertUTCDateToLocalDate(data[i]["timestamp"]).getTime(),
            marker: marker,
            alert: data[i]["alert"],
            parameters: data[i]["parameters"]
          };

          lst.push(obj);
          if (isNotify) {
            // this.alertService.error(data[i]["alert"]["msg"]);
            //display alert
          }
        } else if (data[i]["alert"]["alert_type"] != 'error_code') {
          let obj = {
            y: data[i]["value"].toFixed(4),
            x: this.convertUTCDateToLocalDate(data[i]["timestamp"]).getTime(),
            parameters: data[i]["parameters"]
          }
          lst.push(obj)
        }
      }
      sensorData.push({name: key,data:lst})
      return sensorData;
    } else {
      return [];
    }
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
