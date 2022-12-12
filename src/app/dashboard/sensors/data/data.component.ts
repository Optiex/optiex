import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApexChart, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {

  series:any = [];
  constructor(public platform:Platform) { }

  ngOnInit() {

    this.series =[
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ];

  }


}
