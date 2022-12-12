import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentPage } from './department.page';
import { EquipmentChartsComponent } from './equipment-charts/equipment-charts.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { SensorsComponent } from './sensors/sensors.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentPage,
    children: [
      {
        path: 'sensors',
        component: SensorsComponent
      },
      {
        path: 'equipments',
        component: EquipmentsComponent
        ,children:[
          {
            path: ':id',
            component: EquipmentChartsComponent
          }
        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentPageRoutingModule {}
