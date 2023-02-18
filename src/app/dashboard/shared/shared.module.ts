import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../component/line-chart/line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ColumnChartComponent } from '../component/column-chart/column-chart.component';
import { IonicModule } from '@ionic/angular';
import { SemiCircleChartComponent } from '../component/semi-circle-chart/semi-circle-chart.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgApexchartsModule
  ],
  declarations: [
    LineChartComponent,
    ColumnChartComponent,
    SemiCircleChartComponent
  ],
  exports: [
    LineChartComponent,
    ColumnChartComponent,
    SemiCircleChartComponent
  ],
})
export class SharedModule { }
