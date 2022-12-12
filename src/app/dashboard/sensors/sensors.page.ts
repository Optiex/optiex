import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AllComponent } from './all/all.component';
import { DataComponent } from './data/data.component';

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
      console.log(dept);
      this.title = JSON.parse(dept).name;
    });

    this.getSensors();
    this.series =[
      {
        name: "Desktops",
        data: [50, 41, 35, 51, 49, 62, 69, 91, 148]
      }
      // ,{
      //   name: "Laptop",
      //   data: [31, 21, 65, 21, 49, 72, 19, 81, 100]
      // }
    ];

  }

  getSensors() {
    this.http.get('assets/sensors.json').subscribe((res:any) => {
      this.sensors = res.data;
      console.log(this.sensors[0]);

    },
    (err:any) => {
      console.log(err);
    });
  }

}
