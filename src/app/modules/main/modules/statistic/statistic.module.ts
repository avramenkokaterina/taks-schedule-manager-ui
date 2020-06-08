import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticComponent} from './statistic.component';
import {SprintWidgetsModule} from '../../../sprint-widgets/sprint-widgets.module';
import {TimeStatisticComponent} from './components/time-statistic/time-statistic.component';
import {TasksStatisticComponent} from './components/tasks-statistic/tasks-statistic.component';
import {OverdueStatisticComponent} from './components/overdue-statistic/overdue-statistic.component';
import {ChartsModule} from 'ng2-charts';
import {ProjectHeaderModule} from '../project-header/project-header.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    declarations: [StatisticComponent, TimeStatisticComponent, TasksStatisticComponent, OverdueStatisticComponent],
    imports: [
        CommonModule,
        StatisticRoutingModule,
        SprintWidgetsModule,
        ChartsModule,
        ProjectHeaderModule,
        MatProgressSpinnerModule
    ]
})
export class StatisticModule {
}
