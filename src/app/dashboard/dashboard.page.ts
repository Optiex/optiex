import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  activePageTitle = 'Dashboard';
  Pages = [
    {
      title: 'Departments',
      url: '/dashboard/departments',
      icon: 'person'
    },
    {
      title: 'Equipements',
      url: '/dashboard/equipments',
      icon: 'person'
    }
  ];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    console.log('DashboardPage')
    this.getDepartmentList();
  }

  getDepartmentList() {
    this.dashboardService.getDepartmentList()
    .subscribe((data:any) => {
      console.log(data);
      
    });
  }


}

