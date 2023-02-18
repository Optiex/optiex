import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { EquipmentsService } from './equipments.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.page.html',
  styleUrls: ['./equipments.page.scss'],
})
export class EquipmentsPage implements OnInit {

  equipments:any = [];
  id:any;

  constructor(public http: HttpClient,
    private navCtrl: NavController,
    private router:Router,
    private storage:Storage,
    private activatedRoute:ActivatedRoute,
    private equipmentsServices: EquipmentsService) { }

  ngOnInit() {
    console.log('EquipmentsPage');
    this.activatedRoute.params.subscribe((params:any) => {
      if (params && params.id) {
        this.id = params.id;
      }
      // console.log(this.id);
      this.getEquipments(this.id);
    });
  }

  getEquipments(id:any) {
    this.equipmentsServices.getEquipments(id)
    .subscribe((res) => {
      console.log(res);
      this.equipments = res.data;
    });
  }

  async gotoSensors(equip:any) {
    await this.storage.set('equipment', JSON.stringify(equip));
    this.router.navigateByUrl('/dashboard/equipment/'+equip.id);
  }

}
