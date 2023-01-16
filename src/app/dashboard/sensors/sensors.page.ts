import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AllComponent } from './all/all.component';
import { DataComponent } from './data/data.component';
import { SensorService } from './sensor.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {

  customAlertOptions = {
    header: 'Select Department',
  };

  id:any = null;
  series:any = [];

  sensors:any = [];
  title:string = 'Sensors';
  sensorsUUID:any = [];
  dataLimit = 20;
  graphs:any = [];

  constructor(public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    private storage:Storage,
    private sensorService: SensorService,
    private navCtrl: NavController,
    private router:Router) {

    this.activatedRoute.params.subscribe((params:any) => {
      if (params && params.id) {
        this.id = params.id;
      }
      console.log(this.id);
    });

  }

  ngOnInit() {

    this.storage.get('dept').then((dept: any) => {
      this.title = JSON.parse(dept).name;
    });

    this.getSensors();
  }

  getSensors() {
    // this.http.get('assets/sensors.json').subscribe((res:any) => {
    //   this.sensors = res.data;
    // },
    // (err:any) => {
    //   console.log(err);
    // });

    this.sensorsUUID = [];
    this.sensorService.getGraphs(this.id).subscribe((resp: any) => {
      this.sensors = resp.data;
      this.sensors.forEach((graph:any) => {
        for (var i = 0; i < graph.chart_details.sensor.length; i++) {
          this.sensorsUUID.push(graph.chart_details.sensor[i].uuid);
        }
      });

      this.getSensorsData({
        codes: this.sensorsUUID,
        limit: this.dataLimit
      }).then((data:any) => {
        this.sensors.forEach((sen:any) => {
          if([0, 2, 3].includes(sen.chart_details.graph_type)) { //line chart
            for (var i = 0; i < sen.chart_details.sensor.length; i++) {
              sen.chart_details.sensor[i].data = data[sen.chart_details.sensor[i].uuid];
            }
            this.graphs.push(sen);
          }                                                      //add code for pumps else if
        });
        console.log(this.graphs);
      });

    });

  }

  getSensorsData(data:any) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.sensorService.getSensorsData(data).subscribe((resp: any) => {
        resolve(resp);
      });
    });
  }



}
