import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorsPageRoutingModule } from './sensors-routing.module';

import { SensorsPage } from './sensors.page';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataComponent } from './data/data.component';
import { AllComponent } from './all/all.component';
import { LineChartComponent } from '../component/line-chart/line-chart.component';
import { SemiCircleChartComponent } from '../component/semi-circle-chart/semi-circle-chart.component';
import { ColumnChartComponent } from '../component/column-chart/column-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgApexchartsModule,
    SensorsPageRoutingModule
  ],
  declarations: [
    SensorsPage,
    DataComponent,
    AllComponent,
    LineChartComponent,
    SemiCircleChartComponent,
    ColumnChartComponent
  ]
})
export class SensorsPageModule {}
