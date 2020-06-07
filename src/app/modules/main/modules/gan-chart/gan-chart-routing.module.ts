import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GanChartComponent} from './gan-chart.component';


const routes: Routes = [
    {
        path: '',
        component: GanChartComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GanChartRoutingModule {
}
