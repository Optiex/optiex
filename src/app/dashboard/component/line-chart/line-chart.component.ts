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
export class LineChartComponent implements OnInit {

  @ViewChild("chartDiv",{static: false}) chartDiv: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() chart:any;
  @Input() dataLimit:any;
  @Input() data:any;  //not used

  chartData:any = {};


  ageType:string = 'live';
  socketSub:any;

  series:any = [];

  sensorsUUID:any = [];

  constructor(public platform:Platform,
    public websocketService: WebSocketService,
    public sensorService: SensorService) {
  }

  ngOnInit() {

    this.chartConfig();

    this.chart.chart_details.sensor.forEach((element:any,index:any) => {
      console.log(element)
      this.sensorsUUID.push(element.uuid);
    });

    // Update data using websocket
    this.websocketService.sensorData.subscribe(data => {
      if (this.ageType == 'live') {
        this.updateSocketData(data);
      }
    });

  }

  chartConfig(){
    this.chartOptions = {
      series: [],
      // toolbar: {
      //   show: false
      // },
      tooltip: {
        enabled:false,
        shared:true,
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          return '<div class="arrow_box">' +
            '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
            '</div>'
        }
      },
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
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        }
      },
      yaxis: {
        title: {
          text: 'abc'
        }
      }
    };
    setTimeout(() => {
      this.drawChart(this.chart);
    }, 100);
  }



  drawChart(graph:any) {

    this.chartOptions.title = {
      text:'test',
      align: "left",
      style: {
        fontSize: '20px'
      }
    };
    this.chartOptions.subtitle = {
      text:'test1',
      align: "left",
      style: {
        fontSize: '14px'
      }
    };
    this.chartOptions.yaxis = {
      title: { text: this.chart.chart_details.sensor[0]['unit_disp']}
    };

    for (var i = 0; i < this.chart.chart_details.sensor.length; i++) {
      if (!this.isNullOrUndefined(graph.chart_details.sensor[i]['equipment'])) {
        // this.dataObj['title'] = graph.chart_details.sensor[i]['equipment']['name']
        this.chartOptions.title.text = graph.chart_details.sensor[i]['equipment']['name'];
      } else {
        this.chartOptions.title.text = graph.chart_details.sensor[i]['department']['name'];
      }
      this.chartOptions.subtitle.text = graph.chart_details.sensor[i]['measured_parameter_type_disp'];
      this.chartOptions.yaxis.title = graph.chart_details.sensor[i]['unit_disp']

      this.chartData[graph.chart_details.sensor[i].uuid] =
      this.getGraphDataArray(graph.chart_details.sensor[i]['data'],graph.chart_details.sensor[i].uuid);

      console.log(this.chartData);

    }

    for(let cd in this.chartData) {
      this.series.push({name:cd,data:this.chartData[cd][0].data});
    }

    // let data = [{ x: '05/06/2014', y: 54 }, { x: '05/08/2014', y: 17 }];
    // this.series.push({'name':'SIS090572-PV33','data':data});
    // this.series.push({'name':'SIS090572-PV34','data':data});
    console.log(this.series)
    this.chartOptions.series = this.series;
    if(this.chartDiv){
      this.chartDiv.updateSeries(this.series);
    }
  }

  ngOnDestroy(){
    // this.socketSub.unsubscribe();
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

    this.sensorService.getSensorsData(data).subscribe((resp: any) => {
      for (let i = 0; i < this.sensorsUUID.length; i++) {
        var key = this.sensorsUUID[i];
        this.chartOptions.series = this.getGraphDataArray(resp[key],key);
      }
    });
  }

  updateSocketData(data:any) {
    for (let key in data) {
      for (let j = 0; j < this.series.length; j++) {
        if (this.series[j]['name'] == key) {
          console.log(data[key]);
          if (this.series[j]['data'].length == this.dataLimit + 2) {
            this.series[j]['data'] = this.series[j]['data'].concat(
              this.getGraphConvertedDataLive(data,key)
            ).slice(2);
          } else {
            this.series[j]['data'] = this.series[j]['data'].concat(
              this.getGraphConvertedDataLive(data,key)
            )
          }
          console.log(this.series[j]);
        }
      }
    }
    this.chartOptions.series = this.series;
    if(this.chartDiv){
      this.chartDiv.updateSeries(this.series);
    }
  }

  getGraphConvertedDataLive(data:any, key:any) {
    if (!this.isNullOrUndefined(data)) {
      let lst = [];
        if (!this.isNullOrUndefined(data[key][0]["alert"]) &&
         data[key][0]["alert"]["status"] && data[key][0]["alert"]["alert_type"] != 'error_code') {

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
            y: data[key][0]["value"].toFixed(3),
            x: this.convertUTCDateToLocalDate(data[key][0]["timestamp"]).getTime(),
            marker: marker,
            alert: data[key][0]["alert"],
            parameters: data[key][0]["parameters"]
          };

          lst.push(obj);
        } else {
          let obj = {
            y: data[key][0]["value"].toFixed(3),
            x: this.convertUTCDateToLocalDate(data[key][0]["timestamp"]).getTime(),
            parameters: data[key][0]["parameters"]
          }
          lst.push(obj)
        }
      return lst;
    } else {
      return [];
    }
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
            y: data[i]["value"].toFixed(3),
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
            y: data[i]["value"].toFixed(3),
            x: this.convertUTCDateToLocalDate(data[i]["timestamp"]).getTime(),
            parameters: data[i]["parameters"]
          }
          // console.log(obj)
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
