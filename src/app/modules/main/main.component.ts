import {Component} from '@angular/core';
import {RouterTabItem} from '../../components/router-tabs/router-tabs.types';

@Component({
    selector: 'tsm-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class TSMMainComponent {

    _tabItems: RouterTabItem[] = [
        {
            id: 'projects',
            link: 'projects',
            iconName: 'squares'
        },
        {
            id: 'kanban',
            link: 'kanban',
            iconName: 'kanban'
        },
        {
            id: 'ganChart',
            link: 'gan-chart',
            iconName: 'calendar'
        },
        {
            id: 'projectTeam',
            link: 'project-team',
            iconName: 'people'
        },
        {
            id: 'statistic',
            link: 'statistic',
            iconName: 'statistic'
        },
        {
            id: 'tasks',
            link: 'tasks',
            iconName: 'list'
        }
    ];

    constructor() {
    }

}
