import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'equipments',
        loadChildren: () => import('./equipments/equipments.module').then( m => m.EquipmentsPageModule)
      },
      {
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then( m => m.DepartmentsPageModule)
      }
    ]
  }
  // ,{
  //   path: 'departments',
  //   loadChildren: () => import('./departments/departments.module').then( m => m.DepartmentsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
