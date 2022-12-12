import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentPageRoutingModule } from './department-routing.module';

import { DepartmentPage } from './department.page';
import { EquipmentsComponent } from './equipments/equipments.component';
import { SensorsComponent } from './sensors/sensors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentPageRoutingModule
  ],
  declarations: [DepartmentPage,EquipmentsComponent,SensorsComponent]
})
export class DepartmentPageModule {}
