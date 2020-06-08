import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanChartRoutingModule } from './gan-chart-routing.module';
import { GanChartComponent } from './gan-chart.component';
import {ProjectHeaderModule} from '../project-header/project-header.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [GanChartComponent],
    imports: [
        CommonModule,
        GanChartRoutingModule,
        ProjectHeaderModule,
        MatProgressSpinnerModule
    ]
})
export class GanChartModule { }
