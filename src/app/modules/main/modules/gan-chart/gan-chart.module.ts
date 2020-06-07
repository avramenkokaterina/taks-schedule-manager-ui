import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanChartRoutingModule } from './gan-chart-routing.module';
import { GanChartComponent } from './gan-chart.component';


@NgModule({
  declarations: [GanChartComponent],
  imports: [
    CommonModule,
    GanChartRoutingModule
  ]
})
export class GanChartModule { }
