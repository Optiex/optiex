import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
})
export class DepartmentsPage implements OnInit {

  departments:any;

  constructor(public http: HttpClient,
    private navCtrl: NavController,
    private router:Router,
    private storage: Storage,
    private loadingController: LoadingController,
    private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.getDepartments();
    // console.log()
  }

  gotoEquipments(id:any){
    this.router.navigateByUrl('/dashboard/equipments/'+id);
  }

  async getDepartments(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.departmentsService.getDepartments()
    .subscribe(async (res) => {
      await loading.dismiss();
      console.log(res);
      this.departments = res.data;
    }, async (res) => {
      await loading.dismiss();
    });
  }

  async gotoChart(dept:any) {
    await this.storage.set('dept', JSON.stringify(dept));
    this.router.navigateByUrl('/dashboard/sensors/'+dept.id);
  }

}
