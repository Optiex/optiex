import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorsPageRoutingModule } from './sensors-routing.module';

import { SensorsPage } from './sensors.page';
import { DataComponent } from './data/data.component';
import { AllComponent } from './all/all.component';
import { SemiCircleChartComponent } from '../component/semi-circle-chart/semi-circle-chart.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    SensorsPageRoutingModule
  ],
  declarations: [
    SensorsPage,
    DataComponent,
    AllComponent,
  ]
})
export class SensorsPageModule {}
