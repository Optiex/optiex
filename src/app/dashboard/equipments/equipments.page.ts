import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.page.html',
  styleUrls: ['./equipments.page.scss'],
})
export class EquipmentsPage implements OnInit {

  equipments:any = [];

  constructor(public http: HttpClient,private navCtrl: NavController, private router:Router) { }

  ngOnInit() {
    console.log('EquipmentsPage');
    this.getEquipments();
  }

  getEquipments() {
    this.http.get('assets/8.json').subscribe((res:any) => {
      this.equipments = res.data;
      console.log(this.equipments);
    },
    (err:any) => {
      console.log(err);
    });
  }

  gotoSensors(id:any) {
    this.router.navigateByUrl('/dashboard/sensors/'+id);
  }

}
