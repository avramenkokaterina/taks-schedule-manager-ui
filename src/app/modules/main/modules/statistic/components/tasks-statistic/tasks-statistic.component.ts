import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Task} from '../../../../../../models/entity.model';
import {User} from '../../../../../../models/user.model';
import {Label} from 'ng2-charts';
import {ChartOptions, ChartType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
    selector: 'tsm-tasks-statistic',
    templateUrl: './tasks-statistic.component.html',
    styleUrls: ['./tasks-statistic.component.less']
})
export class TasksStatisticComponent implements OnChanges {

    @Input()
    tasks: Task[];

    @Input()
    users: User[];

    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                color: '#ffffff',
                formatter: (value, ctx) => {
                    if (value > 0 ) {
                        return `${value}`;
                    } else {
                        return '';
                    }
                },
            },
        }
    };
    public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
    public pieChartData: number[];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
        },
    ];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.pieChartLabels = this.users.map((user) => user.fullName);
        this.pieChartData = this.users.map((user) => this.tasks.filter((task) => task.userId === user.id).length);
        this.pieChartColors = [
            {
                backgroundColor: this.users.map((user) => user.color)
            }
        ];
    }

}
