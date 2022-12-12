import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
    private storage: Storage) { }

  ngOnInit() {
    this.getDepartments();
    // console.log()
  }

  gotoEquipments(id:any){
    this.router.navigateByUrl('/dashboard/equipments/'+id);
  }

  getDepartments(){
    this.http.get('assets/dept.json').subscribe((res:any) => {
      this.departments = res.data;
      console.log(this.departments);
    },
    (err:any) => {
      console.log(err);
    });
  }

  async gotoChart(dept:any) {
    await this.storage.set('dept', JSON.stringify(dept));
    this.router.navigateByUrl('/dashboard/sensors/'+dept.id);
  }

}
