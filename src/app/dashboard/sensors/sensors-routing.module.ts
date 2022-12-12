import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { DataComponent } from './data/data.component';

import { SensorsPage } from './sensors.page';

const routes: Routes = [
  {
    path: '',
    component: SensorsPage,
    children:[
      {
        path: 'data',
        component: DataComponent
      },
      {
        path: 'all',
        component: AllComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorsPageRoutingModule {}
