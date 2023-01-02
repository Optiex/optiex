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

    this.sensorService.getGraphs(this.id).subscribe((resp: any) => {
      console.log(resp);
      this.sensors = resp.data;
      console.log(this.sensors);
    });

  }



}
