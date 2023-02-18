import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { EquipmentService } from './equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {
  title = 'Equipment';
  graphs:any = [];
  sensors:any = [];
  id:any;
  dataLimit = 20;
  sensorsUUID:any = [];

  constructor(
    private equipmentServices: EquipmentService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute) {

    this.storage.get('equipment').then((equip:any) => {
      this.title = JSON.parse(equip).name;
    });

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params:any) => {
      if (params && params.id) {
        this.id = params.id;
      }
      this.getEquipmentCharts(this.id);
    });

  }

  showGraphOnFrontPage(graph:any, id:any) {
    this.equipmentServices.showGraphOnFrontPage({ id }).subscribe((resp: any) => {
      if (resp.status) {
        console.log(resp.validation);
        graph.chart_details.is_front = !graph.chart_details.is_front;
        this.presentToast(resp);
      }
    });
  }

  async presentToast(resp:any){
    const toast = await this.toastCtrl.create({
      message: resp.validation,
      duration: 1500,
    });
    await toast.present();
  }

  getEquipmentCharts(id:any) {
    this.sensorsUUID = [];
    this.equipmentServices.getEquipmentCharts(id)
    .subscribe((res) => {
      console.log(res);
      this.sensors = res.data;
      this.sensors.forEach((graph:any) => {
        for (var i = 0; i < graph.chart_details.sensor.length; i++) {
          this.sensorsUUID.push(graph.chart_details.sensor[i].uuid);
        }
      });
      console.log(this.sensorsUUID);
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
      self.equipmentServices.getSensorsData(data).subscribe((resp: any) => {
        resolve(resp);
      });
    });
  }

}
