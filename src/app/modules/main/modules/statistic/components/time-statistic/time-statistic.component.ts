import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Task} from '../../../../../../models/entity.model';
import {User} from '../../../../../../models/user.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
    selector: 'tsm-time-statistic',
    templateUrl: './time-statistic.component.html',
    styleUrls: ['./time-statistic.component.less']
})
export class TimeStatisticComponent implements OnChanges {

    @Input()
    tasks: Task[];

    @Input()
    users: User[];

    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [{}],
            yAxes: [{
                offset: true
            }]
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };

    public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.barChartLabels = this.users.map((user) => user.fullName);
        this.barChartLabels = this.users.map((user) => user.fullName);
        this.barChartData = [
            {
                data: this.users.map((user) => {
                    return this.tasks.filter((task) => task.userId === user.id).reduce((result, next) => {
                        return result + (next.estimate ?? 0);
                    }, 0);
                }),
                label: 'Expected Time'
            },
            {
                data: this.users.map((user) => {
                    return this.tasks.filter((task) => task.userId === user.id).reduce((result, next) => {
                        return result + (next.actualDuration ?? 0);
                    }, 0);
                }),
                label: 'Actual Time'
            }
        ];
    }
}
