import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then( m => m.DepartmentsPageModule)
      },
      {
        path: 'department/:id',
        loadChildren: () => import('./department/department.module').then( m => m.DepartmentPageModule)
      },
      {
        path: 'equipments/:id',
        loadChildren: () => import('./equipments/equipments.module').then( m => m.EquipmentsPageModule)
      },
      {
        path: 'sensors/:id',
        loadChildren: () => import('./sensors/sensors.module').then( m => m.SensorsPageModule)
      },
      {
        path: 'alert',
        loadChildren: () => import('./alert/alert.module').then( m => m.AlertPageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
      },
    ]
  },
  {
    path: 'sensors',
    loadChildren: () => import('./sensors/sensors.module').then( m => m.SensorsPageModule)
  },

  {
    path: 'tables',
    loadChildren: () => import('./tables/tables.module').then( m => m.TablesPageModule)
  },
  {
    path: 'table/:id',
    loadChildren: () => import('./table/table.module').then( m => m.TablePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
